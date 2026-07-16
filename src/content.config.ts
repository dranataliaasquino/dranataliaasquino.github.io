import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

const articulos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/articulos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    audience: z.enum(['pacientes', 'colegas']).default('pacientes'),
    draft: z.boolean().default(false),
  }),
});

// Forward declaration for planned clinical-cases work. No src/content/casos/
// directory exists yet and no page queries this collection, so every build
// prints a [glob-loader] warning about the missing base directory. That is by
// design and honestly reports a pending feature — see CLAUDE.md before
// attempting to silence it.
const casos = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/casos' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    pubDate: z.date(),
    draft: z.boolean().default(false),
  }),
});

export const collections = { articulos, casos };
