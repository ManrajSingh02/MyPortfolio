import { defineArrayMember, defineField, defineType } from "sanity";

export default defineType({
  name: "project",
  title: "Projects",
  type: "document",

  fields: [
    defineField({
      name: "title",
      title: "Title",
      type: "string",
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "slug",
      title: "Slug",
      type: "slug",
      options: { source: "title", maxLength: 96 },
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "description",
      title: "Description",
      type: "text",
      rows: 4,
      validation: (rule) => rule.required(),
    }),

    defineField({
      name: "image",
      title: "Project Image",
      type: "image",
      options: {
        hotspot: true,
      },
    }),

    defineField({
      name: "technologies",
      title: "Technologies",
      type: "array",
      of: [defineArrayMember({ type: "string" })],
    }),

    defineField({
      name: "github",
      title: "GitHub URL",
      type: "url",
    }),

    defineField({
      name: "liveDemo",
      title: "Live Demo",
      type: "url",
    }),

    defineField({
      name: "featured",
      title: "Featured",
      type: "boolean",
      initialValue: false,
    }),
  ],
});