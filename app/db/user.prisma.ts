import db from "./index";

export const getCount = async () => {
  return db.user.count();
};

export const createUser = async (
  name: string,
  password: string,
  email: string,
  bio: string
) => {
  return db.user.create({
    data: {
      name,
      email,
      password,
      profile: {
        create: {
          bio,
        },
      },
    },
    include: {
      profile: true,
    },
  });
};

export const updateUser = async ({ id, data }: { id: number; data: any }) => {
  return db.user.update({
    where: {
      id,
    },
    data: {
      name: data.name,
      password: data.password,
      email: data.email,
      profile: {
        update: {
          bio: data.bio,
        },
      },
    },
    include: {
      profile: true,
    },
  });
};

export const delUser = async (id: number) => {
  let result;
  try {
    result = await db.user.delete({
      where: { id },
      include: {
        profile: true,
      },
    });
    // 处理成功的情况
    return result;
  } catch (error) {
    console.error("Prisma error:", error.message);
    // 在这里处理 Prisma 错误
  }

  return result;
};

export const getUsers = async () => {
  return db.user.findMany({
    include: {
      profile: true,
    },
  });
};

export const getPage = async (skip: number, take: number) => {
  const total = await getCount();
  const data = await db.user.findMany({
    include: {
      profile: true,
    },
    orderBy: {
      createdAt: "desc",
    },
    skip: skip, // 跳过前 skip 条记录
    take: take, // 只检索 take 条记录
  });

  return {
    total,
    data,
  };
};
