const PostGitsalah = require("../models/model.js");

// Create and Save a new Post
exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Post
  const post = new PostGitsalah({
    title: req.body.title,
    description: req.body.description,
    active: req.body.active
  });

  // Save Post in the database
  PostGitsalah.create(post, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Post."
      });
    else res.send(data);
  });
};

// Retrieve all post from the database.
exports.findAll = (req, res) => {
  PostGitsalah.getAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving posts."
      });
    else res.send(data);
  });
};

// Find a single post with a postiD
exports.findOne = (req, res) => {
  PostGitsalah.findById(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Error retrieving Post with id " + req.params.postId
        });
      }
    } else res.send(data);
  });
};

// Update a Post identified by the PostId in the request
exports.update = (req, res) => {
  // Validate Request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  console.log(req.body);

  PostGitsalah.updateById(
    req.params.postId,
    new PostGitsalah(req.body),
    (err, data) => {
      if (err) {
        if (err.kind === "not_found") {
          res.status(404).send({
            message: `Not found Post with id ${req.params.postId}.`
          });
        } else {
          res.status(500).send({
            message: "Error updating Post with id " + req.params.postId
          });
        }
      } else res.send(data);
    }
  );
};

// Delete a Post with the specified postId in the request
exports.delete = (req, res) => {
  PostGitsalah.remove(req.params.postId, (err, data) => {
    if (err) {
      if (err.kind === "not_found") {
        res.status(404).send({
          message: `Not found Post with id ${req.params.postId}.`
        });
      } else {
        res.status(500).send({
          message: "Could not delete Post with id " + req.params.postId
        });
      }
    } else res.send({ message: `Post was deleted successfully!` });
  });
};

// Delete all posts from the database.
exports.deleteAll = (req, res) => {
  PostGitsalah.removeAll((err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all posts."
      });
    else res.send({ message: `All Posts were deleted successfully!` });
  });
};
