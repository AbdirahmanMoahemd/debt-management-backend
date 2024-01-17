import Customers from "../models/borrowersModel.js";

export const getCustomers = async (req, res) => {
  try {
    const customers = await Customers.find();
    res.json(customers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getCustomersCount = async (req, res) => {
  try {
    const customers = await Customers.find();

    let counter = 0;
    for (let i = 0; i < customers.length; i++) {
      counter++;
    }

    res.json({ counter });
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const registerCustomer = async (req, res) => {
  try {
    const { name, email, phone, address, city, country } = req.body;

    const customer = await Customers.create({
      name,
      email,
      phone,
      address,
      city,
      country,
    });
    if (customer) {
      res.json(customer);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateCustomer = async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.address = req.body.address || customer.address;
      customer.city = req.body.city || customer.city;
      customer.country = req.body.country || customer.country;

      const updatedUser = await customer.save();

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteCustomers = async (req, res) => {
  try {
    const customers = await Customers.findById(req.params.id);

    if (customers) {
      await customers.remove();
      res.json({ message: "customer deleted" });
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
