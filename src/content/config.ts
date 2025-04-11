import { defineCollection, z } from 'astro:content';

const projectsCollection = defineCollection({
    type: 'content',
    schema: z.object({
        title: z.string(),
        skills: z.array(z.string()),
        image: z.string(),
        link: z.string().optional(),
        order: z.number(),
        published: z.boolean().default(false),
        github: z.string().optional(),
    }),
});

export const collections = {
    'projects': projectsCollection,
}; 