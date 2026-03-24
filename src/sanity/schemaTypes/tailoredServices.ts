import { defineField, defineType } from 'sanity'

export const tailoredServicesType = defineType({
  name: 'tailoredServices',
  title: 'Tailored Services',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'services',
      title: 'Services',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'image', type: 'image' },
          ],
        },
      ],
    }),
  ],
})
