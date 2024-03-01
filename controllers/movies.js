const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

// Function to get all movies from the database
const getAllMovies = async (req, res) => {
  try {
    const db = mongodb.getDb();
    const movies = await db.collection('movies').find().toArray();
    res.status(200).json({ success: true, data: movies });
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to get a single movie by ID from the database
const getSingleMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ success: false, error: 'Invalid movie ID.' });
    }
    const db = mongodb.getDb();
    const movie = await db.collection('movies').findOne({ _id: new ObjectId(movieId) });
    if (!movie) {
      return res.status(404).json({ success: false, error: 'Movie not found.' });
    }
    res.status(200).json({ success: true, data: movie });
  } catch (error) {
    console.error('Error retrieving movie:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to create a new movie in the database
const createMovie = async (req, res) => {
  try {
    const movieData = req.body;
    const db = mongodb.getDb();
    const result = await db.collection('movies').insertOne(movieData);
    res.status(201).json({ success: true, data: result.ops[0], message: 'Movie created successfully.' });
  } catch (error) {
    console.error('Error creating movie:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to update an existing movie in the database
const updateMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ success: false, error: 'Invalid movie ID.' });
    }
    const movieData = req.body;
    const db = mongodb.getDb();
    const result = await db.collection('movies').updateOne({ _id: new ObjectId(movieId) }, { $set: movieData });
    if (result.modifiedCount === 0) {
      return res.status(404).json({ success: false, error: 'Movie not found.' });
    }
    res.status(200).json({ success: true, message: 'Movie updated successfully.' });
  } catch (error) {
    console.error('Error updating movie:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to delete a movie from the database
const deleteMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    if (!ObjectId.isValid(movieId)) {
      return res.status(400).json({ success: false, error: 'Invalid movie ID.' });
    }
    const db = mongodb.getDb();
    const result = await db.collection('movies').deleteOne({ _id: new ObjectId(movieId) });
    if (result.deletedCount === 0) {
      return res.status(404).json({ success: false, error: 'Movie not found.' });
    }
    res.status(200).json({ success: true, message: 'Movie deleted successfully.' });
  } catch (error) {
    console.error('Error deleting movie:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

module.exports = { getAllMovies, getSingleMovie, createMovie, updateMovie, deleteMovie };