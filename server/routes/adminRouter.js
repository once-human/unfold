import express from "express";
import { adminLogin, getUser, logout } from "../controllers/userController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

// Admin Login
router.post("/login", adminLogin);

// Get Admin User (protected)
router.get("/me", isAuthenticated, getUser); // We will ensure getUser returns role and check role in frontend

// Admin Logout (protected)
router.get("/logout", isAuthenticated, logout);

export default router; 