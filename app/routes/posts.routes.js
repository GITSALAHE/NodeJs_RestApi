module.exports = app => {
  const posts = require("../controllers/controller.js");

  app.post("/createPost", posts.create);

  app.get("/postGitsalah", posts.findAll);

  app.get("/postGitsalah/:postId", posts.findOne);

  app.put("/postGitsalah/:postId", posts.update);

  app.delete("/deletePost/:postId", posts.delete);

  app.delete("/deletePosts", posts.deleteAll);
};
