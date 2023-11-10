import { z } from 'zod'

const userRegistrySchema = z.object({
  email:
    z.string()
      .email(),
  confirmEmail:
    z.string()
      .email()
      .refine((data) => data.email === data.confirmEmail, {
        path: ['Confirm reset'],
        message: 'Los correos ingresados deben ser iguales'
      })
})

export default userRegistrySchema
