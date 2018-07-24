const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const stylus = require("stylus");
const nib = require("nib");

require("dotenv").config({ path: "variables.env" });
require("./models/Post");

const postController = require("./controllers/postController");

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use mongoose to interface with mongo
mongoose.connect(
  "mongodb://heroku_0g0l9z69:su2eipgcplcbu5m9atog04lv07@ds147451.mlab.com:47451/heroku_0g0l9z69"
);

// Use stylus & nib for CSS
function compile(str, path) {
  return stylus(str)
    .set("filename", path)
    .use(nib());
}

app.use(
  stylus.middleware({
    src: __dirname + "/public",
    compile
  })
);

// Use pug for views
app.set("views", __dirname + "/views");
app.set("view engine", "pug");

app.use(express.static(__dirname + "/public"));

// Routes
app.get("/", postController.getposts);
app.post("/addpost", postController.addpost);
app.post("/delete/:id", postController.deletepost);
//

// Listen on PORT
app.set("port", process.env.PORT || 1234);
app.listen(app.get("port"), () => {
  console.log(`Server listening -> PORT 1234`);
});
