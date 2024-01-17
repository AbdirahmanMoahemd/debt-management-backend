import mongoose from "mongoose";

const customersSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true
    },
    email: {
      type: String,
      required: true
    },
    phone: {
      type: String,
      required: true
    },
    address: {
      type: String,
      required: true
    },
    city: {
      type: String,
      required: true
    },
    country: {
      type: String,
      required: true
    },
    
  },
  {
    timestamps: true,
  }
);


const Customers = mongoose.model("customers", customersSchema);

export default Customers;
