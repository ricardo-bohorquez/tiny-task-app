import { z } from 'zod'

const taskSchema = z.object({
  title:
    z.string()
      .min(4, { message: 'El título debe un tener mínimo 4 caracteres' })
      .max(40, { message: 'Se admite un máximo de 40 caracteres' }),
  description:
    z.string()
      .max(200, { message: 'Se admite un máximo de 200 caracteres' })
      .optional()
})

export default taskSchema
