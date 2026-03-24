import { defineField, defineType } from 'sanity'

export const howItWorksType = defineType({
  name: 'howItWorks',
  title: 'How It Works',
  type: 'object',
  fields: [
    defineField({
      name: 'heading',
      title: 'Heading',
      type: 'string',
    }),
    defineField({
      name: 'steps',
      title: 'Steps',
      type: 'array',
      of: [
        {
          type: 'object',
          fields: [
            { name: 'title', type: 'string' },
            { name: 'description', type: 'text' },
            { name: 'iconName', type: 'string' },
          ],
        },
      ],
    }),
    defineField({
      name: 'noteTitle',
      title: 'Note Title',
      type: 'string',
    }),
    defineField({
      name: 'noteText',
      title: 'Note Text',
      type: 'text',
    }),
  ],
})
