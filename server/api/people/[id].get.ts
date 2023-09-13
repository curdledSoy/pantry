export default defineEventHandler(async (event) => {
  const { id } = getRouterParams(event)
  return await usePrisma().user.findFirst({
    where: {
      id: Number(id)
    },
    include: {
      recipes: {
        orderBy: [{
          updatedAt: 'desc'
        }, { createdAt: 'desc' }],
        select: {
          id: true,
          tags: true,
          title: true,
          difficulty: true,
          description: true
        }
      },
      reviews: {
        select: {
          recipe: {
            select: {
              title: true,
              author: {
                select: {
                  id: true,
                  username: true
                }
              }
            }
          },
          text: true
        },
        take: 5
      },
      ratings: {
        select: {
          id: true,
          recipe: {
            select: {
              id: true,
              title: true,
              description: true,
              author: {
                select: {
                  id: true,
                  username: true
                }
              }
            }
          },
          value: true
        },
        take: 5
      },
      _count: {
        select: {
          followers: true,
          following: true,
          reviews: true,
          recipes: true,
          ratings: true
        }
      }
    }
  })
})
