import express from "express";
const router = express.Router();
import {
  registerUser,
  getUsers,
  login,
  getUserProfileById,
  updateProfile,
  updateUserPassword,
  updateUserRole,
  deleteUser
} from "../controllers/usersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, registerUser)
  .get(protect, admin, getUsers);
router.route("/login").post(login);
router.route("/profile/:id").post(protect, getUserProfileById).delete(protect, admin, deleteUser);
router.route("/profile/update/:id").post(protect, updateProfile);
router.route("/password/:id").put(protect, updateUserPassword);
router.route("/role/:id").put(protect, admin, updateUserRole);

export default router;
