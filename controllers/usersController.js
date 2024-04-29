import asyncHandler from "express-async-handler";
import generateToken from "../utils/generateToken.js";
import User from "../models/userModel.js";

// @desc    Auth user & get token
// @route   POST /api/users/login
// @access  Public
export const login = asyncHandler(async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({ email });

    if (user && (await user.matchPassword(password))) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        city: user.city,
        country: user.country,
        token: generateToken(user._id),
      });
    } else {
      res.status(401);
      throw new Error("Invalid email or password");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Register a new user
// @route   POST /api/users
// @access  Public
export const registerUser = asyncHandler(async (req, res) => {
  try {
    const { name, email, password, phone, city, country } = req.body;
    const userExists = await User.findOne({ email });

    if (userExists) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const user = await User.create({
        name,
        email,
        password,
        phone,
        city,
        country,
      });
      if (user) {
        res.json({
          _id: user._id,
          name: user.name,
          email: user.email,
          isAdmin: user.isAdmin,
          phone: user.phone,
          city: user.city,
          country: user.country,
          token: generateToken(user._id),
        });
      }
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
export const getUserProfileById = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    const { token } = req.body;

    if (user) {
      res.json({
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        phone: user.phone,
        city: user.city,
        country: user.country,
        token,
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Update user profile
// @route   PUT /api/users/profile
// @access  Private
export const updateProfile = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.user._id);

    if (user) {
      user.name = req.body.name || user.name;
      user.phone = req.body.phone || user.phone;
      user.city = req.body.city || user.city;
      user.country = req.body.country || user.country;

      if (req.body.password) {
        user.password = req.body.password;
      }

      const updatedUser = await user.save();

      res.status(200).json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        phone: updatedUser.phone,
        city: updatedUser.city,
        country: updatedUser.country,
        token: generateToken(updatedUser._id),
      });
    } else {
      res.status(404);
      throw new Error("User Not Found");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Update user password
// @route   PUT /api/users/password
// @access  Private
export const updateUserPassword = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.password = req.body.password;

      const updatedUser = await user.save();

      res.json({
        _id: updatedUser._id,
        name: updatedUser.name,
        email: updatedUser.email,
        isAdmin: updatedUser.isAdmin,
        phone: updatedUser.phone,
        city: updatedUser.city,
        country: updatedUser.country,
        token: updatedUser.token,
      });
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});


export const updateUserRole = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      user.isAdmin = req.body.isAdmin;

      const updatedUser = await user.save();

      res.json(updatedUser);
    } else {
      res.status(404).json({ message: "User Not Found" });
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsers = asyncHandler(async (req, res) => {
  try {
    const keyword = req.query.keyword
      ? {
          name: {
            $regex: req.query.keyword,
            $options: "i",
          },
        }
      : {};
    const users = await User.find({ ...keyword }).sort({ createdAt: -1 });
    res.json(users);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// @desc    Get all users
// @route   GET /api/users
// @access  Private/Admin
export const getUsersCount = asyncHandler(async (req, res) => {
  const users = await User.find({ isAdmin: false });

  let counter3 = 0;
  for (let i = 0; i < users.length; i++) {
    counter3++;
  }

  res.json({ counter3 });
});

// @desc    Delete by Id
// @route   DELETE /api/users/:id
// @access  Private/Admin
export const deleteUser = asyncHandler(async (req, res) => {
  try {
    const user = await User.findById(req.params.id);

    if (user) {
      await user.remove();
      res.json({ message: "User removed" });
    } else {
      res.status(404);
      throw new Error("User not found");
    }
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});
