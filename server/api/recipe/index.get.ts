import { Cuisine, Difficulty } from '@prisma/client'

export default defineEventHandler<{query?: {title?: string, cuisine?: Cuisine, difficulty?: Difficulty}}>(async (event) => {
  const query = getQuery(event)
  const data = await usePrisma().recipe.findMany({
    ...(query && {
      where: {
        ...(query.cuisine && {
          cuisine: {
            equals: query.cuisine
          }
        }),
        ...(query.title && { OR: [{ title: { equals: query.title } }, { title: { contains: query.title } }] }),
        ...(query.difficulty && {
          difficulty: {
            equals: query.difficulty
          }
        })
      }
    }),
    select: {
      id: true,
      title: true,
      tags: true,
      description: true,
      difficulty: true,
      cuisine: true,
      author: {
        select: {
          id: true,
          username: true,
          _count: {
            select: {
              followers: true
            }
          }
        }
      }
    },
    orderBy: {
      updatedAt: 'asc'
    }
  })
  return data || []
}

)
