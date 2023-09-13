import { PrismaClient, Difficulty, Cuisine } from '@prisma/client'
import { faker } from '@faker-js/faker'

const prisma = new PrismaClient()

async function seed () {
  const NUM_USERS = 10
  const NUM_RECIPES_PER_USER = 3
  const NUM_TAGS = 5
  const NUM_INGREDIENTS = 10

  const ingredients = []
  for (let i = 0; i < NUM_INGREDIENTS; i++) {
    const ingredient = await prisma.ingredient.create({
      data: {
        name: faker.lorem.word()
      }
    })
    ingredients.push(ingredient)
  }

  const tags = []
  for (let i = 0; i < NUM_TAGS; i++) {
    const tag = await prisma.tag.create({
      data: {
        name: faker.lorem.word()
      }
    })
    tags.push(tag)
  }

  // Generate users with recipes, reviews, etc.
  for (let i = 0; i < NUM_USERS; i++) {
    const createdUser = await prisma.user.create({
      data: {
        username: faker.internet.userName(),
        email: faker.internet.email(),
        password: faker.internet.password()
      }
    })

    for (let j = 0; j < NUM_RECIPES_PER_USER; j++) {
      const createdRecipe = await prisma.recipe.create({
        data: {
          title: faker.lorem.words(3),
          description: faker.lorem.sentence(),
          instructions: faker.lorem.paragraphs(3),
          difficulty: faker.helpers.enumValue(Difficulty),
          cuisine: faker.helpers.enumValue(Cuisine),
          author: {
            connect: { id: createdUser.id }
          },
          recipeIngredients: {
            create: ingredients.map(ingredient => ({
              ingredient: {
                connect: { id: ingredient.id }
              },
              quantity: faker.number.float({
                min: 0.1,
                max: 5,
                precision: 0.1
              }),
              unit: faker.science.unit().symbol
            }))
          },
          tags: {
            connect: tags.slice(0, 3).map(tag => ({ id: tag.id }))
          }
        }
      })

      // Create reviews and ratings
      for (const user of await prisma.user.findMany({ where: { NOT: { id: createdUser.id } }, select: { id: true } })) {
        await prisma.review.create({
          data: {
            text: faker.lorem.paragraph(),
            recipe: { connect: { id: createdRecipe.id } },
            user: { connect: { id: user.id } }
          }
        })

        await prisma.rating.create({
          data: {
            value: faker.number.int({ min: 1, max: 5 }),
            recipe: { connect: { id: createdRecipe.id } },
            user: { connect: { id: user.id } }
          }
        })
      }
    }
  }
}

seed()
  .catch((error) => {
    console.error(error)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
