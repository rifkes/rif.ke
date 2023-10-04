import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'settings',
  title: 'Settings',
  type: 'document',
  fields: [
    defineField({
      name: 'contactLinks',
      title: 'Contact Links',
      type: 'array',
      of: [
        defineField({
          name: 'external',
          title: 'External Link',
          type: 'linkExternal',
        }),
        defineField({
          name: 'emailLink',
          title: 'Email',
          type: 'linkEmail',
        }),
      ],
    }),
    defineField({
      name: 'info',
      title: 'Info',
      type: 'array',
      of: [
        defineField({
          type: 'object',
          name: 'infoItem',
          title: 'Item',
          fields: [
            defineField({
              type: 'string',
              name: 'infoItemTitle',
              title: 'Title',
            }),
            defineField({
              type: 'richTextSimple',
              name: 'infoItemText',
              title: 'Text',
            }),
          ],
          preview: {
            select: {
              title: 'infoItemTitle',
            },
            prepare(selection) {
              return {
                ...selection,
                subtitle: 'Info',
                icon: () => 'I',
              };
            }
          },
        }),
      ],
    }),
    defineField({
      name: 'mainSocialLink',
      title: 'Main Social Link',
      type: 'linkExternal',
    }),
    defineField({
      name: 'mainEmailLink',
      title: 'Main Email Link',
      type: 'linkEmail',
    }),
    defineField({
      name: 'siteTitle',
      title: 'Site Title',
      type: 'string',
    }),
    defineField({
      name: 'seoDescription',
      title: 'SEO Description',
      type: 'text',
      rows: 2,
    }),
    defineField({
      name: 'seoImage',
      title: 'SEO Image (used for social media)',
      type: 'image',
    }),
    {
      name: 'seoTags',
      title: 'SEO Keywords (site-wide)',
      type: 'array',
      of: [ { name: 'seoTag', type: 'string' } ],
      options: {
        layout: 'tags',
      },
    },
    defineField({
      name: 'favicon',
      title: 'Favicon',
      type: 'image',
    }),
    defineField({
      name: 'gaMeasurementId',
      title: 'Google Analytics Measurement ID',
      description: 'Google Analytics ID for tracking (G-XXXXXXXXXX)',
      type: 'string',
    }),
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