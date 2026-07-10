import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'social',
  title: 'Social Links',
  type: 'document',
  fields: [
    defineField({
      name: 'github',
      title: 'GitHub',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid GitHub URL.'),
    }),
    defineField({
      name: 'linkedIn',
      title: 'LinkedIn',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid LinkedIn URL.'),
    }),
    defineField({
      name: 'leetCode',
      title: 'LeetCode',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid LeetCode URL.'),
    }),
    defineField({
      name: 'hackerRank',
      title: 'HackerRank',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid HackerRank URL.'),
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
      validation: (rule) => rule.email(),
    }),
    defineField({
      name: 'portfolio',
      title: 'Portfolio',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid portfolio URL.'),
    }),
  ],
  preview: {
    select: {
      title: 'github',
      subtitle: 'linkedIn',
    },
    prepare({ title, subtitle }) {
      return {
        title: 'Social Links',
        subtitle: title || subtitle,
      }
    },
  },
})
