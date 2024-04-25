import express from "express";
const router = express.Router();
import {
  registerBorrower,
  getBorrowers,
  updateBorrower,
  getBorrowersCount,
  deleteBorrower,
  getRecentBorrowers,
} from "../controllers/customersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, registerBorrower)
  .get(protect, getBorrowers);
router
  .route("/:id")
  .put(protect, updateBorrower)
  .delete(protect, admin, deleteBorrower);
router.route("/count").get(protect, getBorrowersCount);
router.route('/recent').get(getRecentBorrowers)

export default router;
