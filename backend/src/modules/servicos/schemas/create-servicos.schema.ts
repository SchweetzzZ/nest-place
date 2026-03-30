import { z } from "zod"

export const createServicoSchema = z.object({
    name: z.string(),
    description: z.string(),
    categoryId: z.string(),
    price: z.number(),
    images: z.array(z.object({
        imageUrl: z.string(),
        imageKey: z.string()
    })).optional()
})
export const updateServicoSchema = createServicoSchema.partial()

export type createServicoDto = z.infer<typeof createServicoSchema>
export type updateServicoDto = z.infer<typeof updateServicoSchema>