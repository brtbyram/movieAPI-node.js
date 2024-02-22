const express = require("express");
const MovieModel = require("../models/movieModel");
const mongoose = require("mongoose");

const postMovie = async (req, res) => {
  const movie = req.body;
  const newMovie = new MovieModel(movie);
  try {
    await newMovie.save();
    res.status(201).json(newMovie);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

const getMovies = async (req, res) => {
  const movies = await MovieModel.find({});
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postMovie,
  getMovies,
};
