import prismaClient from "../../../lib/prisma/prisma-client";

export const getBlogsRepo = async () => {
  return await prismaClient.blog.findMany();
};

export const getBlogByIdRepo = async (id: string) => {
  return await prismaClient.blog.findUnique({
    where: {
      id,
    },
  });
};

export const createBlogRepo = async (
  title: string,
  content: string,
  authorId: string,
) => {
  return await prismaClient.blog.create({
    data: {
      title,
      content,
      authorId,
    },
  });
};

export const updateBlogRepo = async (
  id: string,
  title: string,
  content: string,
) => {
  return await prismaClient.blog.update({
    where: {
      id,
    },
    data: {
      title,
      content,
    },
  });
};

export const deleteBlogRepo = async (id: string) => {
  return await prismaClient.blog.delete({
    where: {
      id,
    },
  });
};

export const getBlogsPerUserRepo = async (authorId: string) => {
  return await prismaClient.blog.findMany({
    where: {
      authorId,
    },
  });
};

export const getBlogsByTitleRepo = async (title: string) => {
  return await prismaClient.blog.findMany({
    where: {
      title: {
        contains: title,
        mode: "insensitive",
      },
    },
  });
};

export const setLikeRepo = async (blogId: string, userId: string) => {
  const [like] = await prismaClient.$transaction([
    prismaClient.like.create({
      data: {
        blogId,
        userId,
      },
    }),
    prismaClient.blog.update({
      where: {
        id: blogId,
      },
      data: {
        likesCount: {
          increment: 1,
        },
      },
    }),
  ]);

  return like;
};

export const removeLikeRepo = async (blogId: string, userId: string) => {
  const [like] = await prismaClient.$transaction([
    prismaClient.like.delete({
        where: {
            userId_blogId: {
                userId,
                blogId,
            },
        },
    }),
    prismaClient.blog.update({
      where: {
        id: blogId,
      },
      data: {
        likesCount: {
          decrement: 1,
        },
      },
    }),
  ]);

  return like;
};

export const getUserLikedBlogsRepo = async (userId: string) => {
  return await prismaClient.like.findMany({
    where: {
      userId,
    },
    include: {
      blog: true,
    },
  });
};

export const getLikesCountRepo = async (blogId: string) => {
  const blog = await prismaClient.blog.findUnique({
    where: {
      id: blogId,
    },
    select: {
      likesCount: true,
    },
  });
  return blog?.likesCount || 0;
};
