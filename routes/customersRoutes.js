import express from "express";
const router = express.Router();
import {
  registerBorrower,
  getBorrowers,
  updateBorrower,
  getCounts,
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
router.route("/count").get(protect, getCounts);
router.route('/recent').get(protect, getRecentBorrowers)

export default router;
