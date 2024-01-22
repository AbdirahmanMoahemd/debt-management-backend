import express from "express";
const router = express.Router();
import {
  registerCustomer,
  getCustomers,
  updateCustomer,
  getCustomersCount,
  deleteCustomers,
} from "../controllers/borrowersController.js";
import { admin, protect } from "../middlewares/authMiddleware.js";

router
  .route("/")
  .post(protect, admin, registerCustomer)
  .get(protect, admin, getCustomers);
router
  .route("/:id")
  .put(protect, admin, updateCustomer)
  .delete(deleteCustomers);
router.route("/count").get(protect, admin, getCustomersCount);

export default router;
