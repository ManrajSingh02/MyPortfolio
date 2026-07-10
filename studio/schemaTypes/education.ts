import { defineField, defineType } from 'sanity'

export default  defineType({
  name: 'education',
  title: 'Education',
  type: 'document',
  fields: [
    defineField({
      name: 'college',
      title: 'College',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'degree',
      title: 'Degree',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'university',
      title: 'University',
      type: 'string',
    }),
    defineField({
      name: 'startYear',
      title: 'Start Year',
      type: 'string',
    }),
    defineField({
      name: 'endYear',
      title: 'End Year',
      type: 'string',
    }),
    defineField({
      name: 'cgpa',
      title: 'CGPA',
      type: 'string',
    }),
  ],
  preview: {
    select: {
      title: 'college',
      subtitle: 'degree',
    },
  },
})
