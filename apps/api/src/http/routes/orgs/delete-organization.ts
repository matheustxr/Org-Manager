import { organizationSchema } from '@saas/auth'
import { FastifyInstance } from 'fastify'
import { ZodTypeProvider } from 'fastify-type-provider-zod'
import { z } from 'zod'

import { auth } from '@/http/middlewares/auth'
import { prisma } from '@/lib/prisma'
import { getUserPermissions } from '@/utils.ts/get-user-permissions'

import { UnauthorizedError } from '../_errors/unauthorized-error'

export async function deleteOrganization(app: FastifyInstance) {
  app
    .withTypeProvider<ZodTypeProvider>()
    .register(auth)
    .delete(
      '/organizations/:slug',
      {
        schema: {
          tags: ['organizations'],
          summary: 'Delete organization',
          security: [{ bearerAuth: [] }],
          params: z.object({
            slug: z.string(),
          }),
          response: {
            204: z.null(),
          },
        },
      },
      async (request, response) => {
        const { slug } = request.params

        const userId = await request.getCurrentUserId()
        const { membership, organization } =
          await request.getUserMembership(slug)

        const authOrganization = organizationSchema.parse(organization)

        const { cannot } = getUserPermissions(userId, membership.role)

        console.log('User ID:', userId)
        console.log('Membership Role:', membership.role)
        console.log('Organization:', organization)
        console.log('Authorization Result:', cannot('update', authOrganization))

        if (cannot('delete', authOrganization)) {
          throw new UnauthorizedError(
            `You're not allowed to delete this organization`,
          )
        }

        await prisma.organization.delete({
          where: {
            id: organization.id,
          },
        })

        return response.status(204).send()
      },
    )
}
