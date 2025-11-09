import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_EVENT_DATE: z.string(),
});

export const envServer = envSchema.parse(process.env);
