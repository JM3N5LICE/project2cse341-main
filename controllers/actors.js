// Import the 'mongodb' module for database connection
const mongodb = require('../db/connect');

// Import the 'ObjectId' class from the 'mongodb' library
const ObjectId = require('mongodb').ObjectId;

// const getAllMovies = async (req, res, next) => {
//   const result = await mongodb.getDb().db().collection("movies").find();
//   result.toArray().then((lists) => {
//     res.setHeader("Content-Type", "application/json");
//     res.status(200).json(lists);
//   });
// };
const getAllActors = async (req, res, next) => {
  try {
    const result = await mongodb.getDb().db().collection("actors").find();
    result.toArray().then((lists) => {
     res.setHeader("Content-Type", "application/json");
     res.status(200).json(lists);
   })
  } catch (error) {
    console.error('Error retrieving movies:', error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Function to get a single movie by ID from the database
const getSingleActor = async (req, res) => {

if (!ObjectId.isValid(req.params.id)) {
  res.status(400).json('Invalid actor ID.');
}
const actorId = new ObjectId(req.params.id);
const result = await mongodb
  .getDb()
  .db()
  .collection("movies")
  .find({ _id: actorId });
result.toArray().then((lists) => {
  res.setHeader("Content-Type", "application/json");
  res.status(200).json(lists[0]);
});
};


// Function to create a new movie in the database
const createActor = async (req, res) => {
  // Implement logic to create a new movie in the 'actors' collection
  try {
    const actor = {
      name: req.body.name,
      age: req.body.age,
      movies: req.body.movies,
    };

    const response = await mongodb.getDb().db().collection('actors').insertOne(actor);

    if (response.acknowledged) {
        res.status(201).json({
          success: true,
          movie: actor, // Return the inserted movie data
          message: 'Actor created successfully.'
        });
      } else {
        console.error('Failed to insert movie. MongoDB response:', response);
        res.status(500).json({
          success: false,
          error: 'Failed to insert actor.'
        });
      }
    } catch (error) {
      console.error(error);
      res.status(500).json({
        success: false,
        error: 'Internal Server Error'
      });
    }
};

// Function to update an existing movie in the database
const updateActor = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json({ error: 'Invalid actor ID.' });
    return;
  }
  // Implement logic to update an existing movie in the 'movies' collection
  const actorId = new ObjectId(req.params.id);
  // be aware of updateOne if you only want to update specific fields
  const actor = {
    name: req.body.name,
    age: req.body.age,
    movies: req.body.movies,
  };
  const response = await mongodb
    .getDb()
    .db()
    .collection('actors')
    .replaceOne({ _id: actorId }, actor);
  console.log(response);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'Some error occurred while updating the actor.');
  }
};

// Function to delete a movie from the database
const deleteActor = async (req, res) => {
  // Implement logic to delete a movie from the 'movies' collection
  try {
    if (!ObjectId.isValid(req.params.id)) {
      res.status(400).json({ error: 'Invalid actor ID.' });
      return;
    }
    const actorId = new ObjectId(req.params.id);
    const response = await mongodb.getDb().db().collection('actors').deleteOne({ _id: actorId });

    console.log(response);
    if (response.deletedCount > 0) {
      res.status(200).send();
    } else {
      res.status(500).json(response.error || 'Some error occurred while deleting the actor.');
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ success: false, error: 'Internal Server Error' });
  }
};

// Export the functions to be used in other modules
module.exports = { getAllActors, getSingleActor, createActor, updateActor, deleteActor };