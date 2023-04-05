const { Validator } = require("node-input-validator");
const Blog = require("./../models/blog.model");
const category = require("./../models/category.model");
const mongoose = require("mongoose");
const fs = require("fs");
const BlogLike = require("./../models/blogLike.model");

exports.list = async (req, res) => {
  try {
    let query = [
      {
        $lookup: {
          from: "accounts",
          localField: "created_by",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category_details",
        },
      },
      { $unwind: "$category_details" },
      {
        $lookup: {
          from: "departments",
          localField: "department",
          foreignField: "_id",
          as: "department_details",
        },
      },
      { $unwind: "$department_details" },
    ];

    let total = await Blog.countDocuments(query);
    let page = req.query.page ? parseInt(req.query.page) : 1;
    let perPage = req.query.perPage ? parseInt(req.query.perPage) : 10;
    let skip = (page - 1) * perPage;
    query.push({
      $skip: skip,
    });
    query.push({
      $limit: perPage,
    });

    query.push({
      $project: {
        _id: 1,
        createdAt: 1,
        content: 1,
        image: 1,
        anonymous: 1,
        "department_details.name_department": 1,
        "department_details._id": 1,
        "category_details.name_category": 1,
        "category_details._id": 1,
        "creator._id": 1,
        "creator.email": 1,
        "creator.username": 1,
        comments_count: { $size: { $ifNull: ["$blog_comments", []] } },
        likes_count: { $size: { $ifNull: ["$blog_likes", []] } },
      },
    });
    if (req.query.sortBy && req.query.sortOrder) {
      var sort = {};
      sort[req.query.sortBy] = req.query.sortOrder == "asc" ? 1 : -1;
      query.push({
        $sort: sort,
      });
    } else {
      query.push({
        $sort: { createdAt: -1 },
      });
    }

    let blogs = await Blog.aggregate(query);
    return res.send({
      message: "Blog successfully fetched",
      data: {
        blogs: blogs.map((doc) => Blog.hydrate(doc)),
        meta: {
          total: total,
          currentPage: page,
          perPage: perPage,
          totalPages: Math.ceil(total / perPage),
        },
      },
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};

exports.details = async (req, res) => {
  try {
    let blog_id = req.params.blog_id;
    console.log(blog_id);

    if (!mongoose.Types.ObjectId.isValid(blog_id)) {
      return res.status(400).send({
        message: "Invalid blog id",
        data: {},
      });
    }

    let query = [
      {
        $lookup: {
          from: "accounts",
          localField: "created_by",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $lookup: {
          from: "categories",
          localField: "category",
          foreignField: "_id",
          as: "category_details",
        },
      },
      { $unwind: "$category_details" },

      {
        $match: {
          _id: mongoose.Types.ObjectId(blog_id),
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          createdAt: 1,
          content: 1,
          image: 1,
          blog_comments: 1,
          "category_details.name": 1,
          "category_details.slug": 1,
          "category_details._id": 1,
          "creator._id": 1,
          "creator.email": 1,
          "creator.first_name": 1,
          "creator.last_name": 1,
          comments_count: { $size: { $ifNull: ["$blog_comments", []] } },
          likes_count: { $size: { $ifNull: ["$blog_dislikess", []] } },
        },
      },
    ];

    let blogs = await Blog.aggregate(query);

    if (blogs.length > 0) {
      let blog = blogs[0];
      let current_user = req.user;
      let liked_by_current_user = false;
      if (current_user) {
        let blog_like = await BlogLike.findOne({
          blog_id: blog._id,
          user_id: current_user._id,
        });
        if (blog_like) {
          liked_by_current_user = true;
        }
      }

      return res.status(200).send({
        message: "Blog successfully fetched",
        data: {
          blog: Blog.hydrate(blog),
          meta: {
            liked_by_current_user: liked_by_current_user,
          },
        },
      });
    } else {
      return res.status(400).send({
        message: "No blog found",
        data: {},
      });
    }
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};
exports.create = async (req, res) => {
  if (req.files && req.files.image) {
    req.body["image"] = req.files.image;
  }
  const v = new Validator(req.body, {
    category: "required",
    image: "mime:jpg.jpeg,png",
    department: "required",
    content: "required",
  });
  const matched = await v.check();
  if (!matched) {
    return res.status(422).send(v.errors);
  }

  try {
    if (req.files && req.files.image) {
      var image_file = req.files.image;
      var image_file_name = Date.now() + "-blog-image-" + image_file.name;
      var image_path = publicPath + "/uploads/blog_images/" + image_file_name;
      await image_file.mv(image_path);
    }

    const newBlog = new Blog({
      anonymous: req.body.anonymous,
      category: req.body.category,
      created_by: req.user._id,
      image: image_file_name,
      department: req.body.department,
      content: req.body.content,
    });
    console.log("image:", image_file_name);

    const created = req.user._id;
    console.log("created", created);
    let blogData = await newBlog.save();
    console.log("hafkjashdfasdfasdf", blogData._id);
    let query = [
      {
        $lookup: {
          from: "accounts",
          localField: "created_by",
          foreignField: "_id",
          as: "creator",
        },
      },
      { $unwind: "$creator" },
      {
        $match: {
          _id: mongoose.Types.ObjectId(blogData._id),
        },
      },
      {
        $project: {
          _id: 1,
          createdAt: 1,
          content: 1,
          department: 1,
          category: 1,
          image: 1,
          "category_details.name": 1,
          "category_details.slug": 1,
          "category_details._id": 1,
          "creator._id": 1,
          "creator.email": 1,
          "creator.name": 1,
          comments_count: { $size: { $ifNull: ["$blog_comments", []] } },
          likes_count: { $size: { $ifNull: ["$blog_likes", []] } },
          dislikes_count: { $size: { $ifNull: ["$blog_dislikes", []] } },
        },
      },
    ];

    let blogs = await Blog.aggregate(query);
    console.log("infor", blogs);

    return res.status(201).send({
      message: "Blog created successfully",
      data: Blog.hydrate(blogs[0]),
    });
  } catch (err) {
    return res.status(400).send({
      message: err.message,
      data: err,
    });
  }
};
exports.toggle_like = async (req, res) => {
  let blog_id = req.params.blog_id;
  if (!mongoose.Types.ObjectId.isValid(blog_id)) {
    return res.status(400).send({
      message: "Invalid blog id",
      data: {},
    });
  }

  Blog.findOne({ _id: blog_id })
    .then(async (blog) => {
      if (!blog) {
        return res.status(400).send({
          message: "No blog found",
          data: {},
        });
      } else {
        let current_user = req.user;

        BlogLike.findOne({
          blog_id: blog_id,
          user_id: current_user._id,
        })
          .then(async (blog_like) => {
            try {
              if (!blog_like) {
                let blogLikeDoc = new BlogLike({
                  blog_id: blog_id,
                  user_id: current_user._id,
                });
                let likeData = await blogLikeDoc.save();
                await Blog.updateOne(
                  {
                    _id: blog_id,
                  },
                  {
                    $push: { blog_likes: likeData._id },
                  }
                );
                return res.status(200).send({
                  message: "Like successfully added",
                  data: {},
                });
              } else {
                await BlogLike.deleteOne({
                  _id: blog_like._id,
                });

                await Blog.updateOne(
                  {
                    _id: blog_like.blog_id,
                  },
                  {
                    $pull: { blog_likes: blog_like._id },
                  }
                );

                return res.status(200).send({
                  message: "Like successfully removed",
                  data: {},
                });
              }
            } catch (err) {
              return res.status(400).send({
                message: err.message,
                data: err,
              });
            }
          })
          .catch((err) => {
            return res.status(400).send({
              message: err.message,
              data: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(400).send({
        message: err.message,
        data: err,
      });
    });
};

exports.toggle_dislike = async (req, res) => {
  let blog_id = req.params.blog_id;
  if (!mongoose.Types.ObjectId.isValid(blog_id)) {
    return res.status(400).send({
      message: "Invalid blog id",
      data: {},
    });
  }

  Blog.findOne({ _id: blog_id })
    .then(async (blog) => {
      if (!blog) {
        return res.status(400).send({
          message: "No blog found",
          data: {},
        });
      } else {
        let current_user = req.user;

        BlogDislike.findOne({
          blog_id: blog_id,
          user_id: current_user._id,
        })
          .then(async (blog_dislike) => {
            try {
              if (!blog_dislike) {
                let blogLikeDoc = new BlogDislike({
                  blog_id: blog_id,
                  user_id: current_user._id,
                });
                let likeData = await blogLikeDoc.save();
                await Blog.updateOne(
                  {
                    _id: blog_id,
                  },
                  {
                    $push: { blog_dislikes: likeData._id },
                  }
                );
                return res.status(200).send({
                  message: "DisLike successfully added",
                  data: {},
                });
              } else {
                await BlogDislike.deleteOne({
                  _id: blog_dislike._id,
                });

                await Blog.updateOne(
                  {
                    _id: blog_dislikes.blog_id,
                  },
                  {
                    $pull: { blog_dislikess: blog_dislikes._id },
                  }
                );

                return res.status(200).send({
                  message: "DisLike successfully removed",
                  data: {},
                });
              }
            } catch (err) {
              return res.status(400).send({
                message: err.message,
                data: err,
              });
            }
          })
          .catch((err) => {
            return res.status(400).send({
              message: err.message,
              data: err,
            });
          });
      }
    })
    .catch((err) => {
      return res.status(400).send({
        message: err.message,
        data: err,
      });
    });
};
exports.delete = async (req, res) => {
  let blog_id = req.params.blog_id;
  if (!mongoose.Types.ObjectId.isValid(blog_id)) {
    return res.status(400).send({
      message: "Invalid blog id",
      data: {},
    });
  }

  Blog.findOne({ _id: blog_id })
    .then(async (blog) => {
      if (!blog) {
        return res.status(400).send({
          message: "No blog found",
          data: {},
        });
      }
      else {
        let old_path = publicPath + "/uploads/blog_images/" + blog.image;
        if (fs.existsSync(old_path)) {
          fs.unlinkSync(old_path);

        await Blog.deleteOne({ _id: blog_id });
        return res.status(200).send({
          message: "Blog successfully deleted"
        });
      } else {
        let old_path = publicPath + "/uploads/blog_images/" + blog.image;
        if (fs.existsSync(old_path)) {
          fs.unlinkSync(old_path);
        }

        await Blog.deleteOne({ _id: blog_id });
        return res.status(200).send({
          message: "Blog successfully deleted",
        });
      }
    }
    })
  
    .catch((err) => {
      return res.status(400).send({
        message: err.message,
        data: err,
      });
    });
  
};
