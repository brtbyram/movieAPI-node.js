const mongoose = require("mongoose");
const express = require("express");
const DirectorModel = require("../models/directorModel");

const getDirectors = async (req, res) => {
  const directors = await DirectorModel.aggregate([
    // burada aggregate metodu ile director collection'ı ile movies collection'ı birleştiriliyor
    {
      $lookup: {
        from: "movies", // movies collection'ı ile birleştirilecek
        localField: "_id", // director collection'ındaki _id ile birleştirilecek
        foreignField: "director_id", // movies collection'ındaki director_id ile birleştirilecek
        as: "movies", // movies collection'ı movies array'ine atanıyor
      },
    }, // burada movies collection'ı ile director collection'ı birleştiriliyor ve movies collection'ı movies array'ine atanıyor
    {
      $unwind: {
        path: "$movies", // eğer director'ın birden fazla movies'i varsa her bir movie için director bilgisi tekrarlanır
        preserveNullAndEmptyArrays: true, // eğer director'ın hiç movies'i yoksa onu da getirir
      },
    }, // burada movies array'i unwind ediliyor ve her bir movie için director bilgisi tekrarlanıyor
    {
      $group: {
        // burada director bilgisi tekrarlanmaması için group ediliyor
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        bio: "$_id.bio",
        movies: "$movies",
      },
    }, // burada director bilgisi tekrarlanmaması için project ediliyor
  ]);

  try {
    res.status(200).json(directors);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const getDirectorById = async (req, res) => {
  const director = await DirectorModel.aggregate([
    {
      $match: {
        _id: new mongoose.Types.ObjectId(req.params.director_id),
      },
    },
    {
      $lookup: {
        from: "movies", // movies collection'ı ile birleştirilecek
        localField: "_id", // director collection'ındaki _id ile birleştirilecek
        foreignField: "director_id", // movies collection'ındaki director_id ile birleştirilecek
        as: "movies", // movies collection'ı movies array'ine atanıyor
      },
    }, // burada movies collection'ı ile director collection'ı birleştiriliyor ve movies collection'ı movies array'ine atanıyor
    {
      $unwind: {
        path: "$movies", // eğer director'ın birden fazla movies'i varsa her bir movie için director bilgisi tekrarlanır
        preserveNullAndEmptyArrays: true, // eğer director'ın hiç movies'i yoksa onu da getirir
      },
    }, // burada movies array'i unwind ediliyor ve her bir movie için director bilgisi tekrarlanıyor
    {
      $group: {
        // burada director bilgisi tekrarlanmaması için group ediliyor
        _id: {
          _id: "$_id",
          name: "$name",
          surname: "$surname",
          bio: "$bio",
        },
        movies: {
          $push: "$movies",
        },
      },
    },
    {
      $project: {
        _id: "$_id._id",
        name: "$_id.name",
        surname: "$_id.surname",
        bio: "$_id.bio",
        movies: "$movies",
      },
    }, // burada director bilgisi tekrarlanmaması için project ediliyor
  ]);

  try {
    res.status(200).json(director);
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

const updateDirectorById = async (req, res) => {
  const { director_id } = req.params;
  const director = req.body;
  const updatedDirector = await DirectorModel.findByIdAndUpdate(
    director_id,
    director,
    {
      new: true,
    }
  );
  try {
    res.status(200).json(updatedDirector);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

const deleteDirectorById = async (req, res) => {
  const { director_id } = req.params;
  const director = await DirectorModel.findByIdAndDelete(director_id);
  try {
    res.status(200).json(director);
  } catch (error) {
    res.status(404).json({ error: error.message });
  }
};

module.exports = {
  getDirectors,
  postDirectors,
  getDirectorById,
  updateDirectorById,
  deleteDirectorById,
};
