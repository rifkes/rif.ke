import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'archive',
  title: 'Archive',
  type: 'document',
  groups: [
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
							name: 'title',
							title: 'Title',
							type: 'string',
						}),
						defineField({
							name: 'client',
							title: 'Client',
							type: 'string',
						}),
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
						}),
						defineField({
							name: 'description',
							title: 'Description',
							type: 'text',
							rows: 2,
						}),
						defineField({
							name: 'agency',
							title: 'Agency',
							type: 'string',
						}),
						defineField({
							name: 'type',
							title: 'Type',
							type: 'string',
							initialValue: 'website',
						}),
						defineField({
							name: 'thumbnailTypeIsVideo',
							title: 'Thumbnail Type is Video',
							type: 'boolean',
							initialValue: false,
						}),
						defineField({
							name: 'image',
							title: 'Image',
							type: 'image',
							hidden: ({ parent }) => parent?.thumbnailTypeIsVideo,
						}),
						defineField({
							name: 'video',
							title: 'Video',
							type: 'mux.video',
							hidden: ({ parent }) => !parent?.thumbnailTypeIsVideo,
						}),
						defineField({
							name: 'tools',
							title: 'Tools',
							type: 'string',
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
										defineField({
											name: 'person',
											title: 'Person',
											type: 'string',
										}),
										defineField({
											name: 'role',
											title: 'Role',
											type: 'string',
										}),
									],
								}),
							],
						}),
						defineField({
							name: 'url',
							title: 'URL',
							type: 'url',
						}),
          ],
          preview: {
            select: {
              title: 'item.title',
							subtitle: 'item.client',
							year: 'item.year',
            },
            prepare(selection) {
              return {
                ...selection,
                subtitle: `${ selection.subtitle } ${ selection.year }`,
                icon: () => '💖',
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
  ],
  preview: {
    select: {
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Holding Page',
      };
    },
  },
});