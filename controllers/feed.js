const { validationResult } = require("express-validator");

const Post = require("../models/post");

exports.getPosts = (req, res, next) => {
  res.status(200).json({
    posts: [
      {
        _id: 102,
        title: "first post",
        content: "this is the first post",
        imageUrl: "images/book.jpeg",
        creator: {
          name: "Abhijay",
        },
        createdAt: new Date(),
      },
    ],
  });
};

exports.createPost = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty) {
    const error = new Error('"Validation failed. Entered data is incorrect"');
    error.statusCode = 422;
    throw error;
    // return res.status(422).json({
    //   message: "Validation failed. Entered data is incorrect",
    //   errors: errors.array(),
    // });
  }
  const title = req.body.title;
  const content = req.body.content;

  const post = new Post({
    title: title,
    content: content,
    imageUrl: "images/book.jpeg",
    creator: { name: "Abhijay" },
  });

  post
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "post created successfully",
        post: result,
      });
    })
    .catch((err) => {
      if (!err.statusCode) {
        err.statusCode(500);
      }
      next(err);
    });
};
