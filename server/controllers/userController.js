import ErrorHandler from "../middlewares/error.js";
import { catchAsyncError } from "../middlewares/catchAsyncError.js";
import { User } from "../models/userModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import twilio from "twilio";
import { sendToken } from "../utils/sendToken.js";
import crypto from "crypto";


const client = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);


// Register
export const register = catchAsyncError(async (req, res, next) => {
  try {
    const { name, email, phone, password, verificationMethod } = req.body;
    if (!name || !email || !phone || !password || !verificationMethod) {
      return next(new ErrorHandler("All fields are required.", 400));
    }

    function validatePhoneNumber(phone) {
      console.log("Validating phone number:", phone); // Debug log
      const phoneRegex = /^\+91[6-9]\d{9}$/;

      return phoneRegex.test(phone);
    }
    
    if (!validatePhoneNumber(phone)) {
      return next(new ErrorHandler("Invalid phone number.", 400));
    }

    const existingUser = await User.findOne({
      $or: [
        { email, accountVerified: true },
        { phone, accountVerified: true },
      ],
    });

    if (existingUser) {
      return next(new ErrorHandler("Phone or Email is already used.", 400));
    }

    const registrationAttempts = await User.find({
      $or: [
        { phone, accountVerified: false },
        { email, accountVerified: false },
      ],
    });

    if (registrationAttempts.length > 3) {
      return next(new ErrorHandler(
        "You have exceeded the maximum number of attempts (3). Please try again after an hour.",
        400
      ));
    }

    const userData = { name, email, phone, password };
    const user = await User.create(userData);
    const verificationCode = await user.generateVerificationCode();
    await user.save();

    sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res);
  } catch (error) {
    next(error);
  }
});

// Helper function
async function sendVerificationCode(verificationMethod, verificationCode, name, email, phone, res) {
  try {
    if (verificationMethod === "email") {
      const message = generateEmailTemplate(verificationCode);
      await sendEmail({ email, subject: "Your Verification Code", message });
      res.status(200).json({ success: true, message: `Verification email successfully sent to ${name}` });
    } else if (verificationMethod === "phone") {
      console.log('Sending OTP to:', phone);
      console.log('From number:', process.env.TWILIO_PHONE_NUMBER);
      
      // Ensure phone number is in E.164 format
      if (!phone.startsWith('+')) {
        return res.status(400).json({ success: false, message: "Invalid phone number format." });
      }

      const message = await client.messages.create({
        body: `Your verification code is: ${verificationCode}`,
        from: process.env.TWILIO_PHONE_NUMBER, // Make sure this is a valid Twilio number
        to: phone, // The phone number to which the message is sent
      });

      res.status(200).json({ success: true, message: "OTP sent via SMS." });
    } else {
      return res.status(500).json({ success: false, message: "Invalid verification method." });
    }
  } catch (error) {
    console.log('Error sending OTP:', error);
    return res.status(500).json({ success: false, message: "Verification code failed to send." });
  }
}


// Helper function
function generateEmailTemplate(verificationCode) {
  return `
    <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #ddd; border-radius: 8px; background-color: #f9f9f9;">
      <h2 style="color: #4CAF50; text-align: center;">Verification Code</h2>
      <p>Dear User,</p>
      <p>Your verification code is:</p>
      <div style="text-align: center; margin: 20px 0;">
        <span style="display: inline-block; font-size: 24px; font-weight: bold; color: #4CAF50; padding: 10px 20px; border: 1px solid #4CAF50; border-radius: 5px; background-color: #e8f5e9;">
          ${verificationCode}
        </span>
      </div>
      <p>Please use this code to verify your email address. The code will expire in 10 minutes.</p>
      <footer style="margin-top: 20px; text-align: center; font-size: 12px; color: #aaa;">
        <p>Thank you,<br>Your Company Team</p>
      </footer>
    </div>
  `;
}

// Verify OTP
export const verifyOTP = catchAsyncError(async (req, res, next) => {
  const { email, otp, phone } = req.body;

  function validatePhoneNumber(phone) {
    const phoneRegex = /^\+91[6-9]\d{9}$/;
    return phoneRegex.test(phone);
  }

  if (!validatePhoneNumber(phone)) {
    return next(new ErrorHandler("Invalid phone number.", 400));
  }

  try {
    const userEntries = await User.find({
      $or: [{ email, accountVerified: false }, { phone, accountVerified: false }]
    }).sort({ createdAt: -1 });

    if (!userEntries.length) {
      return next(new ErrorHandler("User not found.", 404));
    }

    let user = userEntries[0];

    if (userEntries.length > 1) {
      await User.deleteMany({
        _id: { $ne: user._id },
        $or: [{ phone, accountVerified: false }, { email, accountVerified: false }]
      });
    }

    if (user.verificationCode !== Number(otp)) {
      return next(new ErrorHandler("Invalid OTP.", 400));
    }

    const currentTime = Date.now();
    const verificationExpire = new Date(user.verificationCodeExpire).getTime();

    if (currentTime > verificationExpire) {
      return next(new ErrorHandler("OTP Expired.", 400));
    }

    user.accountVerified = true;
    user.verificationCode = null;
    user.verificationCodeExpire = null;
    await user.save({ validateModifiedOnly: true });

    sendToken(user, 200, "Account Verified.", res);
  } catch (error) {
    next(new ErrorHandler("Internal Server Error.", 500));
  }
});

// Login
export const login = catchAsyncError(async (req, res, next) => {
  const { email, password } = req.body;
  console.log('Login request body:', req.body); // Debug log

  if (!email || !password) {
    return next(new ErrorHandler("Email and password are required.", 400));
  }

  const user = await User.findOne({ email, accountVerified: true }).select("+password");
  console.log("User found in login:", user); // Debug log

  if (!user || !(await user.comparePassword(password))) {
    return next(new ErrorHandler("Invalid email or password.", 400));
  }

  sendToken(user, 200, "User logged in successfully.", res);
});

// Logout
export const logout = catchAsyncError(async (req, res, next) => {
  res
    .status(200)
    .cookie("token", "", { expires: new Date(Date.now()), httpOnly: true })
    .json({ success: true, message: "Logged out successfully." });
});

// Get user
export const getUser = catchAsyncError(async (req, res, next) => {
  const user = req.user;
  res.status(200).json({ success: true, user });
});

// Forgot Password
export const forgotPassword = catchAsyncError(async (req, res, next) => {
  const user = await User.findOne({ email: req.body.email, accountVerified: true });

  if (!user) {
    return next(new ErrorHandler("User not found.", 404));
  }

  const resetToken = user.generateResetPasswordToken();
  await user.save({ validateBeforeSave: false });

  const resetPasswordUrl = `${process.env.FRONTEND_URL}/password/reset/${resetToken}`;
  const message = `Your Reset Password Token is:\n\n${resetPasswordUrl}\n\nIf you did not request this, please ignore.`;

  try {
    await sendEmail({
      email: user.email,
      subject: "Reset Your Password",
      message,
    });

    res.status(200).json({ success: true, message: `Email sent to ${user.email} successfully.` });
  } catch (error) {
    user.resetPasswordToken = undefined;
    user.resetPasswordExpire = undefined;
    await user.save({ validateBeforeSave: false });
    next(new ErrorHandler(error.message || "Cannot send reset password token.", 500));
  }
});

// Reset Password
export const resetPassword = catchAsyncError(async (req, res, next) => {
  const { token } = req.params;

  const resetPasswordToken = crypto.createHash("sha256").update(token).digest("hex");

  const user = await User.findOne({
    resetPasswordToken,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return next(new ErrorHandler("Reset password token is invalid or has expired.", 400));
  }

  if (req.body.password !== req.body.confirmPassword) {
    return next(new ErrorHandler("Password and confirm password do not match.", 400));
  }

  user.password = req.body.password;
  user.resetPasswordToken = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  sendToken(user, 200, "Password reset successfully.", res);
});
