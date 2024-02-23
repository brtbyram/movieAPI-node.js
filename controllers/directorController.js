const mongoose = require("mongoose");
const DirectorModel = require("../models/directorModel");

const getDirectors = async (req, res) => {
  const directors = await DirectorModel.find({});
  try {
    res.status(200).json(directors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const postDirectors = async (req, res) => {
  const director = req.body;
  const newDirector = new DirectorModel(director);
  try {
    await newDirector.save();
    res.status(201).json(newDirector);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

module.exports = {
  getDirectors,
  postDirectors,
};
