import { getServerSession } from '#auth'

export default defineEventHandler(async (event) => {
  const session = await getServerSession(event)
  if (session && session.user) {
    event.context.auth = session
  }
})
