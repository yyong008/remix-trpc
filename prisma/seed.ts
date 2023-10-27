import Prisma from '@prisma/client'

const prisma = new Prisma.PrismaClient()

const seed = async () => {
  const user = await prisma.user.create({
    data: {
      name: 'y1',
      email: 'y1@remix-tRPC.com',
      profile: {
        create: {
          bio: 'http://localhost:3000/bio/xxx.png',
        }
      }
    }
  })

  console.log("seed user", user);
}

seed()
