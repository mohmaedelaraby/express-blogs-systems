import AppError from "../../../common/errors/app-error";
import {
  createBlogRepo,
  deleteBlogRepo,
  getBlogByIdRepo,
  getBlogsPerUserRepo,
  getBlogsByTitleRepo,
  getBlogsRepo,
  getLikesCountRepo,
  getUserLikedBlogsRepo,
  removeLikeRepo,
  setLikeRepo,
  updateBlogRepo,
} from "../repo/blogs.repo";

export const getBlogsService = async () => {
  return await getBlogsRepo();
};

export const getBlogByIdService = async (id: string) => {
  return await getBlogByIdRepo(id);
};

export const createBlogService = async (
  title: string,
  content: string,
  authorId: string,
) => {
  if (!title || !content || !authorId) {
    throw new AppError("Title, content, and authorId are required", 400);
  }
  return await createBlogRepo(title, content, authorId);
};

export const updateBlogService = async (
  id: string,
  title: string,
  content: string,
) => {
  if (!title || !content) {
    throw new AppError("Title and content are required", 400);
  }
  return await updateBlogRepo(id, title, content);
};

export const deleteBlogService = async (id: string) => {
  return await deleteBlogRepo(id);
};

export const getBlogsByTitleService = async (title: string) => {
  return await getBlogsByTitleRepo(title);
};
export const getBlogsPerUserService = async (authorId: string) => {
  return await getBlogsPerUserRepo(authorId);
};


export const setLikesService = async (blogId: string, userId: string) => {
  return await setLikeRepo(blogId, userId);
};

export const removeLikesService = async (blogId: string, userId: string) => {
  return await removeLikeRepo(blogId, userId);
};
export const getBlogsLikesCountService = async (blogId: string) => {
  const blogCount = await getLikesCountRepo(blogId);
  return blogCount || 0;
};

export const getUserLikedBlogsService = async (userId: string) => {
  const blogs = await getUserLikedBlogsRepo(userId);
  return blogs || [];
};
