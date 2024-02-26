const express = require("express");
const router = express.Router();
const UserModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const status = require("statuses");

const register = async (req, res) => {
  const { username, password } = req.body;
  bcrypt.hash(password, 10, async (err, hash) => {
    if (err) {
      res.status(500).json({ error: err.message });
    } else {
      const user = new UserModel({ username, password: hash });
      try {
        await user.save();
        res.status(201).json(user);
      } catch (error) {
        res.status(400).json({ error: error.message });
      }
    }
  });
};

const authenticate = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await UserModel.findOne({ username });
    if (!user) {
      res.json({
        status: false,
        error: "Authentication failed, user not found",
      });
    } else {
      bcrypt.compare(password, user.password, (err, result) => {
        if (result) {
          const payload = { username }; // token içine koyacağımız bilgiler buraya yazılır
          const token = jwt.sign(payload, req.app.get("api_secret_key"), {
            // token oluşturuluyor ve secret key ile imzalanıyor
            expiresIn: 720, // 12 saat
          });
          res.json({ status: true, token });
        } else {
          res.json({
            status: false,
            error: "Authentication failed, wrong password",
          });
        }
      });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

module.exports = {
  register,
  authenticate,
};
