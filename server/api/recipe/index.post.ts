import { Recipe, RecipeIngredient } from '@prisma/client'

type request = {
  body: {recipe: Omit<Recipe, 'id'| 'authorId'| 'createdAt'| 'updatedAt'>, ingredients: Omit<RecipeIngredient, 'id' | 'recipeId'>[] }
};

export default defineEventHandler<request, any>(async (event) => {
  const { recipe: newRecipe, ingredients } = await readBody(event)
  const success = await usePrisma().recipe.create(
    {
      data: {
        ...newRecipe,
        ...{
          author: {
            connect: {
              id: Number(event.context.auth.user.id)
            }
          }
        },
        ...{
          recipeIngredients: {
            create: ingredients.map(({ quantity, ingredientId, unit }) => {
              return {
                quantity,
                unit,
                ingredient: {
                  connect: {
                    id: ingredientId
                  }
                }
              }
            })

          }
        }
      }
    }
  )

  success && setResponseStatus(event, 201, `recipe created with ID: ${success.id}`)

  return null
})
