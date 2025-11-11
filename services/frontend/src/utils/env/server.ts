import { z } from "zod";

export const envSchema = z.object({});

export const envServer = envSchema.parse(process.env);
