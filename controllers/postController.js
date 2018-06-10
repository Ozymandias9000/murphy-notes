const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({ body: String });
const Post = mongoose.model('Post', postSchema);

exports.getposts = async (req, res) => {
	await Post.find({}, (err, posts) => {
		res.render('index', { posts });
	});
};

exports.addpost = async (req, res) => {
	if (req.body.postBody === '') {
		res.redirect('/');
		return;
	}
	const postData = new Post({
		body: req.body.postBody
	});
	await postData.save();
	res.redirect('/');
};

exports.deletepost = async (req, res) => {
	await Post.findOneAndRemove({'_id': req.params.id});
	res.redirect('/');
}
