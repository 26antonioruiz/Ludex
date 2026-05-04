import { z } from 'zod'

export const priceAlertSchema = z.object({
  price: z.number().positive('El precio debe ser mayor que 0'),
})