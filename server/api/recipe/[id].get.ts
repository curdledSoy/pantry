export default defineEventHandler(async (event) => {
  const params = getRouterParams(event)
  let id: number
  try {
    id = parseInt(params.id)
  } catch (e) {
    throw createError({
      statusCode: 400,
      statusMessage: 'User already exists!'
    })
  }
  const aggregates = await usePrisma().rating.aggregate({
    where: {
      recipe: {
        id
      }
    },
    _avg: {
      value: true
    }
  })
  const recipeWithTagsAndAuthor = await usePrisma().recipe.findFirst({
    where: {
      id
    },
    include: {
      tags: true,
      _count: {
        select: {
          ratings: true
        }
      },
      ratings: {
        select: {
          id: true,
          user: {
            select: {
              id: true,
              username: true
            }
          },
          value: true
        }
      },
      author: {
        select: {
          id: true,
          username: true,
          _count: {
            select: {
              followers: true,
              following: true,
              recipes: true
            }
          }
        }
      },
      recipeIngredients: {
        select: {
          ingredient: true,
          unit: true,
          quantity: true
        }
      }
    }
  })
  return { ...recipeWithTagsAndAuthor, ...aggregates }
}

)
