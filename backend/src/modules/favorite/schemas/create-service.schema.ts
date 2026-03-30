import { z } from "zod"

export const createFavoriteSchema = z.object({
    userId: z.string().uuid(),
    itemId: z.string().uuid(),
    itemType: z.enum(["product", "service"])
})

export const updateFavoriteSchema = createFavoriteSchema.partial()

export type CreateFavoriteDto = z.infer<typeof createFavoriteSchema>
export type UpdateFavoriteDto = z.infer<typeof updateFavoriteSchema>