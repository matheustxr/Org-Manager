import type { FastifyInstance } from 'fastify'
import { ZodError } from 'zod'

import { BadRquestError } from './routes/_errors/bad-request-error'
import { UnauthorizationError } from './routes/_errors/unauthorization-error'

type FastifyErrorHandler = FastifyInstance['errorHandler']

export const errorHanlder: FastifyErrorHandler = (error, request, response) => {
  if (error instanceof ZodError) {
    return response.status(400).send({
      message: 'Validation error',
      errors: error.flatten().fieldErrors,
    })
  }

  if (error instanceof BadRquestError) {
    return response.status(400).send({
      message: error.message,
    })
  }

  if (error instanceof UnauthorizationError) {
    return response.status(400).send({
      message: error.message,
    })
  }

  console.error(error)

  // send error to some observability plataform

  return response.status(500).send({ message: 'Internal Server Error' })
}
