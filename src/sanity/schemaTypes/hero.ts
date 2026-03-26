import { defineField, defineType } from 'sanity'

export const heroType = defineType({
  name: 'hero',
  title: 'Hero',
  type: 'object',
  fields: [
    defineField({
      name: 'titleLine1',
      title: 'Title Line 1 (Top)',
      type: 'string',
      description: 'e.g., Recurring Monthly',
    }),
    defineField({
      name: 'titleLine2Italic',
      title: 'Title Line 2 (Italic Part)',
      type: 'string',
      description: 'e.g., Bookkeeping',
    }),
    defineField({
      name: 'titleLine2Normal',
      title: 'Title Line 2 (Normal Part)',
      type: 'string',
      description: 'e.g., for U.S.',
    }),
    defineField({
      name: 'titleLine3',
      title: 'Title Line 3 (Bottom)',
      type: 'string',
      description: 'e.g., Small Businesses',
    }),
    defineField({
      name: 'subtitle',
      title: 'Subtitle',
      type: 'text',
    }),
    defineField({
      name: 'ctaText',
      title: 'CTA Button Text',
      type: 'string',
    }),
    defineField({
      name: 'image',
      title: 'Hero Image',
      type: 'image',
      options: {
        hotspot: true,
      },
    }),
  ],
})
