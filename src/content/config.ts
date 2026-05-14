import { defineCollection, z } from 'astro:content';

const articulos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    audience: z.enum(['pacientes', 'colegas']).default('pacientes'),
    draft: z.boolean().default(false),
  }),
});

const casos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articulos, casos };
