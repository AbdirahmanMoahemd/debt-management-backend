import Customers from "../models/cutomersModel.js";

export const getBorrowers = async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const customers = await Customers.find({ ...keyword }).sort({
      createdAt: -1,
    });
    res.json(customers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};


export const getRecentBorrowers = async (req, res) => {
  try {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const customers = await Customers.find({createdAt: { $gte: today }}).sort({
      createdAt: -1
    });

    
    res.json(customers);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const getBorrowersCount = async (req, res) => {
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

export const registerBorrower = async (req, res) => {
  try {
    const { name, email, phone, address, borrowedItems,isActive  } = req.body;

    const customer = await Customers.create({
      name,
      email,
      phone,
      address,
      borrowedItems,
      isActive,
    });
    if (customer) {
      res.json(customer);
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const updateBorrower = async (req, res) => {
  try {
    const customer = await Customers.findById(req.params.id);

    if (customer) {
      customer.name = req.body.name || customer.name;
      customer.email = req.body.email || customer.email;
      customer.phone = req.body.phone || customer.phone;
      customer.address = req.body.address || customer.address;
      customer.borrowedItems = req.body.borrowedItems || customer.borrowedItems;
      customer.isActive = req.body.isActive || customer.isActive;

      const updatedUser = await customer.save();

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};

export const deleteBorrower = async (req, res) => {
  try {
    const customer = await Customers.findByIdAndDelete(req.params.id);

    if (customer) {
      // await customer.remove();
      res.json({ message: "customer deleted" });
    } else {
      res.status(404).json({ message: "Customer Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
};
