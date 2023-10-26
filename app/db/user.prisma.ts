import db from './index'

export const createUser = async (name: string, email: string,bio: string) => {
  return db.uesr.create({
    data: {
      name,
      email,
      profile: {
        create: {
          bio,
        }
      }
    },
    include: {
      profile: true,
    }
  })
}

export const getUsers = async () => {
  return db.uesr.findMany({});
}
