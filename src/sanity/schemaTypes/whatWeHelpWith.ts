import { defineField, defineType } from 'sanity'

export const whatWeHelpWithType = defineType({
  name: 'whatWeHelpWith',
  title: 'What We Help With',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'tagline',
      title: 'Tagline',
      type: 'string',
    }),
    defineField({
      name: 'description1',
      title: 'Description Paragraph 1',
      type: 'text',
    }),
    defineField({
      name: 'description2',
      title: 'Description Paragraph 2',
      type: 'text',
    }),
    defineField({
      name: 'services',
      title: 'Services List',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'iconName', type: 'string', description: 'Name of the Lucide icon' },
          ],
        },
      ],
    }),
  ],
})
