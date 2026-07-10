import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'skill',
  title: 'Skills',
  type: 'document',
  fields: [
    defineField({
      name: 'skillName',
      title: 'Skill Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'category',
      title: 'Category',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'percentage',
      title: 'Percentage',
      type: 'number',
      validation: (rule) => rule.min(0).max(100),
    }),
    defineField({
      name: 'icon',
      title: 'Icon',
      type: 'string',
      description: 'Icon name or class used by the frontend.',
    }),
    defineField({
      name: 'color',
      title: 'Color',
      type: 'string',
      description: 'Hex code, CSS color, or theme color token.',
    }),
  ],
  preview: {
    select: {
      title: 'skillName',
      subtitle: 'category',
    },
  },
})
