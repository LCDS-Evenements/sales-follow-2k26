import { z } from "zod";

export const envSchema = z.object({});

export const envClient = envSchema.parse({});
