import express from "express";
const router = express.Router();
import {
  registerUser,
  getUsers,
  login,
  getUserProfileById,
  updateProfile,
  updateUserPasswordApp,
} from "../controllers/usersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router.route("/").post(registerUser).get(protect, admin, getUsers);
router.route("/login").post(login);
router.route("/profile/:id").post(protect, getUserProfileById);
router.route("/profile/update/:id").post(protect, updateProfile);
router.route("/app/password/:id").put(protect, updateUserPasswordApp);

export default router;
