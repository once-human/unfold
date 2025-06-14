import { config } from "dotenv";
import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import { connection } from "./database/dbConnection.js";
import { errorMiddleware } from "./middlewares/error.js";
import userRouter from "./routes/userRouter.js"
import { removeUnverifiedAccounts } from "./automation/removeUnverifiedAccounts.js";
import bodyParser from 'body-parser';


export const app = express();
config({path: "./config.env"});

app.use(cors({
    origin: function(origin, callback) {
      const allowedOrigins = [
        process.env.FRONTEND_URL,
        process.env.ADMIN_PANEL_URL
      ];
      console.log('Request origin:', origin); // Debug log
      console.log('Allowed origins:', allowedOrigins); // Debug log
      if (allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error('Not allowed by CORS'));
      }
    },
    methods: ["GET", "POST", "PUT", "DELETE", "OPTION"],
    credentials: true,
})
);

app.use(cookieParser());
app.use(express.json());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));


app.use("/api/v1/user" , userRouter);


removeUnverifiedAccounts();
connection();


app.use(errorMiddleware);// should be at the last of the code only 


