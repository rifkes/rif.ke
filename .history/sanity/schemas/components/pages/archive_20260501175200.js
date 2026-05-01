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
							type: 'string',
						}),
						defineField({
							name: 'url',
							title: 'URL',
							type: 'url',
						}),
						defineField({
							name: 'status',
							title: 'Status',
							type: 'string',
						}),
						defineField({
							name: 'link',
							title: 'Link',
							type: 'url',
						}),
						defineField({
							name: 'hidden',
							title: 'Hidden',
							type: 'boolean',
							initialValue: false,
						}),
          ],
          preview: {
            select: {
              title: 'title',
							client: 'client',
							year: 'year',
							image: 'image',
							video: 'video',
							type: 'type',
							status: 'status',
							thumbnailTypeIsVideo: 'thumbnailTypeIsVideo',
							hidden: 'hidden',
            },
						prepare({ title, client, year, image, video, type, status, thumbnailTypeIsVideo, hidden, }) {
							return {
								title: `${title}, ${client}, ${year}`,
								subtitle: `${type}, ${status}`,
								media: hidden ? () => '🤫' : thumbnailTypeIsVideo ? video.asset.thumbnail : image,
								icon: () => '💖',
							}
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