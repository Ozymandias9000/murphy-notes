const express = require('express');
const app = express();
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { catchErrors } = require('./handlers/errorHandlers');
const postController = require('./controllers/postController');
require('dotenv').config({  path: 'variables.env' });

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true}));

mongoose.connect("mongodb://localhost:27017/murphy_blog");

// Use pug for views
app.set('view engine', 'pug');

// Routes
app.get('/', catchErrors(postController.getposts));
app.post('/addpost', postController.addpost);
//


// Listen on PORT
app.set('port', process.env.PORT || 3000);
const server = app.listen(app.get('port'), () => {
	console.log(`Server listening -> PORT ${server.address().port}`);
});
