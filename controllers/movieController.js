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
  const movies = await MovieModel.aggregate([
    {
      $lookup: {
        from: "directors", // hangi collection'dan alınacak
        localField: "director_id", // hangi field ile eşleşecek
        foreignField: "_id", // eşleşecek field hangisi
        as: "director", // eşleşen field'ı hangi field'a atayacak
      },
    },
  ]);

  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getMovieById = async (req, res) => {
  const { movie_id } = req.params;
  const movie = await MovieModel.findById(movie_id);
  try {
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const updateMovieById = async (req, res) => {
  const { movie_id } = req.params;
  const movie = req.body;
  const updatedMovie = await MovieModel.findByIdAndUpdate(movie_id, movie, {
    new: true,
  });
  try {
    res.status(200).json(updatedMovie);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteMovieById = async (req, res) => {
  const { movie_id } = req.params;
  const movie = await MovieModel.findByIdAndDelete(movie_id);
  try {
    res.status(200).json(movie);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getTop10Movies = async (req, res) => {
  const movies = await MovieModel.find({}).sort({ imdb_score: -1 }).limit(10);
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getMoviesBetweenYears = async (req, res) => {
  const { start_year, end_year } = req.params;
  const movies = await MovieModel.find({
    year: { $gte: parseInt(start_year), $lte: parseInt(end_year) }, // $gte: büyük veya eşit, $lte: küçük veya eşit
  });
  try {
    res.status(200).json(movies);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  postMovie,
  getMovies,
  getMovieById,
  updateMovieById,
  deleteMovieById,
  getTop10Movies,
  getMoviesBetweenYears,
};
