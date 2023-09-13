import { promisify } from 'util'
import * as crypto from 'crypto'
type request = {
  body: {
    email: string;
    username: string;
    password: string;
    confirmPassword: string;
  };
};

export default defineEventHandler<request, any>(async (event) => {
  const prisma = usePrisma()
  const { authSalt } = useRuntimeConfig()
  const pbkdf2 = promisify(crypto.pbkdf2)
  const body = await readBody(event)

  const userExists =
    (await prisma.user.count({
      where: {
        OR: [{ email: body.email }, { username: body.username }]
      }
    })) !== 0
  if (userExists) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists!'
    })
  }
  const passwordsMatch = body.password === body.confirmPassword
  if (!passwordsMatch) {
    throw createError({
      statusCode: 400,
      statusMessage: "Passwords don't match!"
    })
  }
  const hash = (
    await pbkdf2(body.password, authSalt, 10000, 512, 'sha512')
  ).toString('hex')
  const user = await prisma.user.create({
    data: {
      username: body.username,
      email: body.email,
      password: hash
    },
    select: {
      username: true,
      email: true,
      _count: {
        select: {
          reviews: true,
          ratings: true,
          followers: true,
          following: true
        }
      }
    }
  })
  return user
})
