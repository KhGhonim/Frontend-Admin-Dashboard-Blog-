import PostModel from "../Models/Post.js";

export const createPost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "You are not allowed to create a post",
    });
  }

  if (
    !req.body.title ||
    !req.body.author ||
    !req.body.catagory ||
    !req.body.profilePicture ||
    !req.body.content
  ) {
    return res.status(400).json({
      message: "Please fill all the fields",
    });
  }

  try {
    const savedPost = await PostModel.create({
      title: req.body.title,
      author: req.body.author,
      catagory: req.body.catagory,
      postImage: req.body.profilePicture,
      content: req.body.content,
      userId: req.user.id,
    });

    res.status(200).send(savedPost);
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const AllPosts = async (req, res, next) => {
  try {
    const Posts = await PostModel.find();
    if (Posts) {
      res.status(200).send(Posts);
    } else {
      res.status(404).send("Posts not found");
    }
  } catch (error) {
    res.status(500).send(error.message);
  }
};

export const deletePost = async (req, res, next) => {
  if (!req.user.isAdmin) {
    return res.status(403).json({
      message: "You are not allowed to delete a post",
    });
  }
  const id = req.params.id;
  await PostModel.findByIdAndDelete(id).then((data) => {
    if (!data) {
      res.status(404).send({
        message: `Cannot delete Post with id=${id}. Maybe Post was not found!`,
      });
    } else {
      res.send({
        message: "Post was deleted successfully!",
      });
    }
  });
};
