import { defineCollection, z } from "astro:content";

// Define the schema for the blog collection
const blogCollection = defineCollection({
	type: "content",
	schema: z.object({
		title: z.string(),
		pubDate: z.date(),
		updatedDate: z.date().optional(),
		description: z.string(),
		author: z.string().default("Nick Russo"),
		image: z
			.object({
				url: z.string().optional(),
				alt: z.string().optional(),
			})
			.optional(),
		tags: z.array(z.string()).default([]),
		draft: z.boolean().default(false),
	}),
});

// Export the collections
export const collections = {
	blog: blogCollection,
};
