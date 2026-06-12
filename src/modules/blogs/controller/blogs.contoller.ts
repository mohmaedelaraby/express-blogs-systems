import { Request, Response, NextFunction } from "express";
import {
  deleteBlogService,
  getBlogByIdService,
  getBlogsByTitleService,
  getBlogsLikesCountService,
  getBlogsPerUserService,
  getBlogsService,
  getUserLikedBlogsService,
  removeLikesService,
  setLikesService,
  updateBlogService,
} from "../services/blogs.services";

export const getBlogs = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const title = req.query.title as string | undefined;
    const blogs = title ? await getBlogsByTitleService(title) : await getBlogsService();
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const getBlogById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    const blog = await getBlogByIdService(blogId as string);
    if (!blog) {
      return res.status(404).json({ message: "Blog not found" });
    }
    res.status(200).json(blog);
  } catch (error) {
    next(error);
  }
};

export const createBlogService = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { title, content, authorId } = req.body;
    const newBlog = await createBlogService(title, content, authorId);
    res.status(201).json(newBlog);
  } catch (error) {
    next(error);
  }
};

export const updateBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    const { title, content } = req.body;
    const updatedBlog = await updateBlogService(
      blogId as string,
      title,
      content,
    );
    res.status(200).json(updatedBlog);
  } catch (error) {
    next(error);
  }
};

export const deleteBlog = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    await deleteBlogService(blogId as string);
    res.status(204).send();
  } catch (error) {
    next(error);
  }
};

export const getBlogsPerUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const authorId = req.params.authorId;
    const blogs = await getBlogsPerUserService(authorId as string);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  }
};

export const setLikes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userId;
    const result = await setLikesService(blogId as string, userId as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const removeLikes = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    const userId = req.body.userId;
    const result = await removeLikesService(blogId as string, userId as string);
    res.status(200).json(result);
  } catch (error) {
    next(error);
  }
};

export const getBlogsLikesCount = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const blogId = req.params.id;
    const likesCount = await getBlogsLikesCountService(blogId as string);
    res.status(200).json({ likesCount });
  } catch (error) {
    next(error);
  }
};

export const getLikedBlogsPerUser = async (
  req: Request,
  res: Response,
    next: NextFunction,
) => {
  try {
    const authorId = req.params.authorId;
    const blogs = await getUserLikedBlogsService(authorId as string);
    res.status(200).json(blogs);
  } catch (error) {
    next(error);
  } 
};
