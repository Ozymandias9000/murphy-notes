const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const stylus = require("stylus");
const nib = require("nib");
const { catchErrors } = require("./handlers/errorHandlers");
const postController = require("./controllers/postController");
require("dotenv").config({ path: "variables.env" });

// Use bodyParser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Use mongoose to interface with mongo
mongoose.connect("mongodb://localhost:27017/murphy_blog");

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
app.get("/", catchErrors(postController.getposts));
app.post("/addpost", postController.addpost);
app.post("/delete/:id", catchErrors(postController.deletepost));
//

// Listen on PORT
app.set("port", process.env.PORT || 1234);
const server = catchErrors(
  app.listen(app.get("port"), () => {
    console.log(`Server listening -> PORT 1234`);
  })
);
