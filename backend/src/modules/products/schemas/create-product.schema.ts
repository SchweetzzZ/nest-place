import { z } from "zod"

export const createProductSchema = z.object({
    name: z.string().min(3, "Name must be at least 3 characters long"),
    description: z.string().min(3, "Description must be at least 3 characters long"),
    categoryId: z.string(),
    price: z.number(),
    images: z.array(
        z.object({
            imageUrl: z.string().url("Invalid image URL"),
            imageKey: z.string().min(1, "Image key is required")
        })
    ).min(1, "At least one image is required")
})

export const updateProductSchema = createProductSchema.partial()

export type CreateProductDto = z.infer<typeof createProductSchema>
export type UpdateProductDto = z.infer<typeof updateProductSchema>