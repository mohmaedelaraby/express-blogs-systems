import { Router } from "express";
import { createBlogService, deleteBlog, getBlogById, getBlogs, getBlogsLikesCount, getBlogsPerUser, getLikedBlogsPerUser, removeLikes, setLikes, updateBlog } from "./controller/blogs.contoller";

const router = Router();

router.get("/", getBlogs);
router.get("/:id", getBlogById);
router.post("/", createBlogService);
router.put("/:id", updateBlog);
router.delete("/:id", deleteBlog)
router.post("/:id/like", setLikes);
router.delete("/:id/like", removeLikes)
router.get("/:blogId/likes",getBlogsLikesCount)

router.get("/user/:authorId/liked", getLikedBlogsPerUser);
router.get("/user/:authorId", getBlogsPerUser);

export default router;
