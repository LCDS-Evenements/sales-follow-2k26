import { z } from "zod";

export const envSchema = z.object({
  NEXT_PUBLIC_EVENT_DATE: z.string(),
});

export const envClient = envSchema.parse({
  NEXT_PUBLIC_EVENT_DATE: process.env.NEXT_PUBLIC_EVENT_DATE,
});
