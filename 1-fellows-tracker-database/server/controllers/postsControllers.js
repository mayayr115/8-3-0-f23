const Fellow = require('../model/Fellow');
const Posts = require('../model/Posts');


/* 
These controllers take incoming requests and utilize the
methods provided by the Fellow "model" before sending a
response back to the client (or an error message).
*/

// Get All (Read)
const servePost = async (req, res) => {
  const postsList = await Posts.list();
  res.send(postList);
}

// Get One (Read)
const serveFellow = async (req, res) => {
  const { id } = req.params;
  const fellow = await Fellow.find(Number(id));

  if (!fellow) return res.status(404).send(`No fellow with the id ${id}`);
  res.send(fellow);
};

// Create
const createPost = async (req, res) => {
  const {title,  body, fellowId } = req.body; // POST request body
  const newPost = await Posts.create(title, body, fellowId);
  res.send(newPost);
};

// Update
const updateFellow = async (req, res) => {
  const { fellowName } = req.body;
  const { id } = req.params;
  const updatedFellow = await Fellow.editName(Number(id), fellowName);
  // sendStatus sends just the status with no message body
  if (!updatedFellow) return res.sendStatus(404);
  res.send(updatedFellow);
}

// Delete
const deleteFellow = async (req, res) => {
  const { id } = req.params;
  const didDelete = await Fellow.delete(Number(id));
  const statusCode = didDelete ? 204 : 404;
  res.sendStatus(statusCode);
}

module.exports = {
  servePost,
  serveFellow,
  createPost,
  updateFellow,
  deleteFellow
};