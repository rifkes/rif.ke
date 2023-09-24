import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'homePage',
  title: 'Home Page',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
      default: true,
    },
  ],
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'item',
          title: 'Item',
          fields: [
            defineField({
              type: 'reference',
              name: 'item',
              title: 'Item',
              to: [ { type: 'item' } ],
            }),
          ],
          preview: {
            select: {
              title: 'item.title',
              subtitle: 'item.client',
              media: 'item.backgroundImage',
            },
            prepare(selection) {
              return {
                ...selection,
                icon: () => '🐌',
              };
            }
          },
        }),
        defineField({
          type: 'object',
          name: 'textSection',
          title: 'Text',
          fields: [
            defineField({
              type: 'text',
              name: 'textSectionText',
              title: 'Text',
            }),
          ],
          preview: {
            select: {
              title: 'textSectionText',
            },
            prepare(selection) {
              return {
                ...selection,
                subtitle: 'Text',
                icon: () => 'T',
              };
            }
          },
        }),
      ],
      group: 'content',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
      group: 'seo',
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image (used for social media)',
      type: 'image',
      group: 'seo',
    }),
    {
      name: 'seoTags',
      title: 'SEO Keywords (site-wide)',
      type: 'array',
      of: [ { name: 'seoTag', type: 'string' } ],
      options: {
        layout: 'tags',
      },
      group: 'seo',
    },
  ],
  preview: {
    select: {
      media: 'seoImage',
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Holding Page',
      };
    },
  },
});