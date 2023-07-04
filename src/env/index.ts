import 'dotenv/config';
import { z } from 'zod';

const envSchema = z.object({
  NODE_ENV: z.enum(['dev', 'production', 'test']).default('dev'),
  PORT: z.coerce.number().default(3333),
});

const envParsed = envSchema.safeParse(process.env);

if (envParsed.success === false) {
  console.log('Invalid enviroment variables', envParsed.error.format());

  throw new Error('Invalid enviroment variables.');
}

export const env = envParsed.data;
