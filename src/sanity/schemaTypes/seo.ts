import { defineField, defineType } from 'sanity'

export const seoType = defineType({
  name: 'seo',
  title: 'SEO & Metadata',
  type: 'object',
  fields: [
    defineField({
      name: 'metaTitle',
      title: 'Meta Title',
      type: 'string',
      description: 'Title for search engines and social media. Recommended length: 50-60 characters.',
      validation: (Rule) => Rule.max(70).warning('Longer titles may be truncated.'),
    }),
    defineField({
      name: 'metaDescription',
      title: 'Meta Description',
      type: 'text',
      rows: 3,
      description: 'Description for search engines and social media. Recommended length: 150-160 characters.',
      validation: (Rule) => Rule.max(160).warning('Longer descriptions may be truncated.'),
    }),
    defineField({
      name: 'shareImage',
      title: 'Share Image',
      type: 'image',
      description: 'Image for social media sharing (Open Graph). Recommended size: 1200x630px.',
    }),
  ],
})
