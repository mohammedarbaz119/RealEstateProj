import prisma from "../lib/prisma.js";
import jwt from "jsonwebtoken";
export const getAllposts = async (req, res) => {
  try {
    const query = req.query;
    const posts = await prisma.post.findMany({
      where: {
        city: query.city || undefined,
        type: query.type || undefined,
        property: query.property || undefined,
        bedroom: parseInt(query.bedroom) || undefined,
        price: {
          gte: parseInt(query.minPrice) || undefined,
          lte: parseInt(query.maxPrice) || undefined,
        },
      },
    });
    console.log(posts+"Dekho");
    res.status(200).json({ posts });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error fetching posts" });
  }
};

export const getPost = async (req, res) => {
  try {
    const { id } = req.params;
    let saved;
    const post = await prisma.post.findUnique({
      where: { id },
      include: {
        postDetail: true,
        User: { select: { id:true,username: true, avatar: true } },
      },
    });
    let token = req.cookies.token;
    if(!token){
    res.status(200).json({ post: post, isSaved: false });
    return;
    }
    else{
      jwt.verify(token, process.env.JWT_SECRET, async (err, payload) => {
        if (!err) {
          saved = await prisma.savedPost.findUnique({
            where: {
              userId_postId: {
                postId: id,
                userId: payload.id,
              },
            },
          });
      res.status(200).json({ post: post, isSaved: saved ? true : false });

        }
      });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in fetching post" });
  }
};

export const createPost = async (req, res) => {
  try {
    const body = req.body;
    const id = req.userId;
    const post = await prisma.post.create({
      data: {
        ...body.postData,
        userId: id,
        postDetail: {
          create: {
            ...body.postDetail,
          },
        },
      },
    });
    res.status(201).json({ post: post });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "error in creating user" });
  }
};

export const updatePost = async (req, res) => {
  try {
    const { id } = req.params;
    if (req.userId !== id) {
      return res.status(403).json({ message: "Unauthorized" });
    }
    const { img, ...input } = req.body;
    if (img) {
      input.img = img;
    }
    const post = await prisma.post.update({
      where: { id },
      data: { ...input },
    });
    res.status(200).json({ post: post });
  } catch (err) {
    res.status(500).json({ message: "unable to update post" });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { id } = req.params;
    const post = await prisma.post.findUnique({
      where: { id },
    });

    if (post.userId !== req.userId) {
      return res.status(403).json({ message: "Not Authorized!" });
    }

    await prisma.post.delete({ where: { id } });
    res.status(200).json({ message: `Delete post with id ${id}` });
  } catch (err) {
    res.status(500).json({ message: "unable to delete post" });
  }
};
