import { defineField, defineType } from "sanity";

export default defineType({
  name: "certificate",
  title: "Certificates",
  type: "document",
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'organization',
      title: 'Organization',
      type: 'string',
      validation: (rule) => rule.required(),
    }),
    defineField({
      name: 'issueDate',
      title: 'Issue Date',
      type: 'date',
    }),
    defineField({
      name: 'certificateImage',
      title: 'Certificate Image',
      type: 'image',
      options: { hotspot: true },
    }),
    defineField({
      name: 'certificatePdf',
      title: 'Certificate PDF',
      type: 'file',
      options: { accept: 'application/pdf' },
    }),
    defineField({
      name: 'credentialLink',
      title: 'Credential Link',
      type: 'url',
      validation: (rule) =>
        rule.uri({ scheme: ['http', 'https'] }).error('Enter a valid credential URL.'),
    }),
  ],
  orderings: [
    {
      title: 'Issue Date',
      name: 'issueDateDesc',
      by: [{ field: 'issueDate', direction: 'desc' }],
    },
  ],
  preview: {
    select: {
      title: 'title',
      subtitle: 'organization',
      media: 'certificateImage',
    },
  },
})
