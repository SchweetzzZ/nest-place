import { z } from "zod"

export const createSellerSchema = z.object({
    storeName: z.string().min(3, "Store name must be at least 3 characters long"),
    description: z.string().min(10, "Description must be at least 10 characters long"),
    phone: z.string().min(11, "Phone number must be at least 11 characters long"),
    cpf: z.string().min(11, "CPF must be at least 11 characters long"),
    status: z.enum(["pending", "approved", "rejected"]),
    images: z.array(z.object({
        imageUrl: z.string(),
        imageKey: z.string(),
        position: z.number().default(0)
    })).optional()
})

export type CreateSellerDto = z.infer<typeof createSellerSchema>
export type UpdateSellerDto = z.infer<typeof createSellerSchema>