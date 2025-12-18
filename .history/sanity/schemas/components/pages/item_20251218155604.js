import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'item',
  title: 'Item',
  icon: () => '🗒️',
  type: 'document',
  groups: [
    {
      name: 'seo',
      title: 'SEO',
    },
    {
      name: 'content',
      title: 'Content',
    },
  ],
  fields: [
    defineField({
      name: 'title',
      title: 'Title',
      type: 'string',
    }),
    defineField({
      title: 'Slug',
      name: 'slug',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'project',
      title: 'Project',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'year',
      title: 'Year',
      type: 'number',
      group: 'content',
    }),
    defineField({
      name: 'description',
      title: 'Description',
      type: 'text',
      rows: 2,
      group: 'content',
    }),
    defineField({
      name: 'url',
      title: 'URL',
      type: 'url',
      group: 'content',
    }),
    defineField({
      name: 'client',
      title: 'Client',
      type: 'string',
      group: 'content',
    }),
    defineField({
      name: 'backgroundImage',
      title: 'Background Image',
      type: 'image',
      group: 'content',
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'mux.video',
			group: 'content',
		}),
    defineField({
      name: 'categories',
      type: 'array',
      title: 'Categories',
      of: [
        defineField({
          name: 'category',
          title: 'Category',
          type: 'string',
        }),
      ],
      options: {
        layout: 'tags',
      },
      group: 'content',
    }),
    defineField({
      name: 'role',
      title: 'Role',
      type: 'string',
    }),
    defineField({
      name: 'credits',
      title: 'Credits',
      type: 'array',
      of: [
        defineField({
          name: 'credit',
          title: 'Credit',
          type: 'object',
          fields: [
            { name: 'person', title: 'Name', type: 'string', },
            { name: 'role', title: 'Role', type: 'string' },
          ],
          options: {
            columns: 2,
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
  ],
  preview: {
    select: {
      title: 'title',
			media: 'video.asset.thumbnail',
			subtitle: 'year',
			video: 'video',
    },
    prepare(selection) {
      const { video } = selection;
      return {
        ...selection,
        media: video ? '🎥' : () => '🐌',
      };
    },
  },
});