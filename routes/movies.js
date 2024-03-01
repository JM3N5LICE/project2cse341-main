// Import the 'express' module to create a router
const express = require('express');
const router = express.Router();

// Import the 'contactsController' module, which contains functions for handling contact-related routes
const moviesController = require('../controllers/movies');
const validation = require('../middleware/validate');
const { requiresAuth } = require('express-openid-connect');

// Movie Routes
router.get('/', requiresAuth(), moviesController.getAllMovies);
router.get('/:id', requiresAuth(), moviesController.getSingleMovie);
router.post('/', requiresAuth(), validation.saveMovie, moviesController.createMovie);
router.put('/:id', requiresAuth(), validation.saveMovie, moviesController.updateMovie);
router.delete('/:id', requiresAuth(), moviesController.deleteMovie );

module.exports = router;

