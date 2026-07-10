import { defineField, defineType } from 'sanity'

export const profile = defineType({
  name: 'profile',
  title: 'Profile',
  type: 'document',
  fields: [
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'profession',
      title: 'Profession',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'photo',
      title: 'Photo',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'about',
      title: 'About',
      type: 'text',
      rows: 5,
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'phone',
      title: 'Phone',
      type: 'string',
    }),
    defineField({
      name: 'location',
      title: 'Location',
      type: 'string',
    }),
    defineField({
      name: 'resumePdf',
      title: 'Resume PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
  ],
  preview: {
    select: {
      title: 'name',
      subtitle: 'profession',
      media: 'photo',
    },
  },
})
