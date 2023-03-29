import { prisma } from '../../prisma'

export const dashboardHandler = async (request, response, context) => {
    // finding resource called movies
    const resourceData = await prisma.users.findMany({
        select: {
            createdAt: true
        }
    })
    return resourceData
}