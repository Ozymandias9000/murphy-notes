const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const { sanitizeBody } = require("express-validator/filter");

exports.getposts = async (req, res) => {
  await Post.find({}, (err, posts) => {
    res.render("index", { posts });
  });
};

// Using express validator as middleware to trim and escape to
// prevent cross-site scripting attacks
exports.addpost = [
  sanitizeBody("postBody")
    .trim()
    .escape(),

  async (req, res) => {
    if (req.body.postBody === "") {
      res.redirect("/");
      return;
    }
    const postData = new Post({
      body: req.body.postBody
    });
    await postData.save().catch(err => console.log(err));
    res.redirect("/");
  }
];

exports.deletepost = async (req, res) => {
  await Post.findOneAndRemove({ _id: req.params.id });
  res.redirect("/");
};
