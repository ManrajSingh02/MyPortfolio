import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'resume',
  title: 'Resume',
  type: 'document',
  fields: [
    defineField({
      name: 'resumePdf',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
      validation: (rule) => rule.required(),
    }),
  ],
  preview: {
    prepare() {
      return {
        title: 'Resume PDF',
      }
    },
  },
})
