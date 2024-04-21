import express from "express";
const router = express.Router();
import {
  registerCustomer,
  getCustomers,
  updateCustomer,
  getCustomersCount,
  deleteCustomers,
} from "../controllers/customersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, registerCustomer)
  .get(protect, getCustomers);
router
  .route("/:id")
  .put(protect, updateCustomer)
  .delete(protect, admin, deleteCustomers);
router.route("/count").get(protect, getCustomersCount);

export default router;
