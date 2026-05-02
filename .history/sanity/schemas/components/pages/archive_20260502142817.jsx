import { defineField, defineType } from 'sanity'
import ProjectArchiveInput from '../../../components/ProjectArchiveInput';

export default defineType({
  name: 'archive',
  title: 'Archive',
  type: 'document',
  fields: [
    defineField({
      name: 'items',
      title: 'Items',
			type: 'array',
			components: {
				input: ProjectArchiveInput,
			},
      options: {
        collapsible: true,
        collapsed: true,
      },
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
							name: 'hidden',
							title: 'Hidden',
							type: 'boolean',
							initialValue: false,
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
							type: 'reference',
							to: [{ type: 'video' }],
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
							type: 'string',
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
		}),
		defineField({
			name: 'pressAndAwards',
			title: 'Press and Awards',
			type: 'array',	
			options: {
				collapsible: true,
				collapsed: true,
			},
			of: [
				defineField({
					type: 'object',
					name: 'pressAndAwards',
					title: 'Press and Award',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
						}),
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
						}),
						defineField({
							name: 'publication',
							title: 'Publication or Body',
							type: 'string',
						}),
						defineField({
							name: 'url',
							title: 'Url',
							type: 'url',
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'title',
					year: 'year',
					publication: 'publication',
					url: 'url',
				},
				prepare({ title, year, publication, url }) {
					return {
						title: `${title}, ${year}`,
						subtitle: `${publication}, ${url}`,
						media: () => '🗞️',
					}
				}
			},
		}),
		defineField({
			name: 'engagements',
			title: 'Engagements',
			type: 'array',
			options: {
				collapsible: true,
				collapsed: true,
			},
			of: [
				defineField({
					type: 'object',
					name: 'engagement',
					title: 'Engagement',
					fields: [
						defineField({
							name: 'title',
							title: 'Title',
							type: 'string',
						}),
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
						}),
						defineField({
							name: 'type',
							title: 'Type',
							type: 'text',
						}),
						defineField({
							name: 'organiser',
							title: 'Organiser',
							type: 'string',
						}),
						defineField({
							name: 'collaborators',
							title: 'Collaborators',
							type: 'string',
						}),
					],
				}),
			],
			preview: {
				select: {
					title: 'title',
					year: 'year',
					type: 'type',
					organiser: 'organiser',
					collaborators: 'collaborators',
				},
				prepare({ title, year, type, organiser, collaborators }) {
					return {
						title: `${title}, ${year}`,
						subtitle: `${type}, ${organiser}, ${collaborators}`,
						media: () => '🗣️',
					}
				}
			},
		}),
		defineField({
			name: 'teaching',
			title: 'Teaching',
			type: 'array',
			options: {
				collapsible: true,
				collapsed: true,
			},
			of: [
				defineField({
					type: 'object',
					name: 'teaching',
					title: 'Teaching',
					fields: [
						defineField({
							name: 'course',
							title: 'Course',
							type: 'string',
						}),
						defineField({
							name: 'year',
							title: 'Year',
							type: 'number',
						}),
						defineField({
							name: 'institution',
							title: 'Institution',
							type: 'string',
						}),
						defineField({
							name: 'collaborators',
							title: 'Collaborators',
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
			preview: {
				select: {
					course: 'course',
					year: 'year',
					institution: 'institution',
					role: 'role',
					collaborators: 'collaborators',
				},
				prepare({ course, year, institution, role, collaborators }) {
					return {
						title: `${course}, ${year}`,
						subtitle: `${institution}, ${role}, ${collaborators}`,
						media: () => '🎓',
					}
				}
			},
		}),
  ],
  preview: {
    select: {
    },
    prepare(selection) {
      return {
        ...selection,
        title: 'Archive',
      };
    },
  },
});