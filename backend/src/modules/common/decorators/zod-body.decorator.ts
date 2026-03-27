import { ZodSchema } from "zod"
import { Body } from "@nestjs/common"
import { ZodValidationPipe } from "../pipes/zod-validation.pipe"

export const zodBody = (schema: ZodSchema) =>
    Body(new ZodValidationPipe(schema))