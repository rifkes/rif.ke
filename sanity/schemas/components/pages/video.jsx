import { defineField, defineType } from 'sanity'
import ProjectArchiveInput from '../../../components/ProjectArchiveInput';

export default defineType({
  name: 'video',
  title: 'Video',
  type: 'document',
	fields: [
		defineField({
			name: 'title',
			title: 'Title',
			type: 'string',
		}),
		defineField({
			name: 'video',
			title: 'Video',
			type: 'mux.video',
		}),
	],
	preview: {
		select: {
			title: 'title',
			video: 'video',
		},
		prepare({ title, video }) {
			return {
				title,
				subtitle: 'video',
				media: video?.asset?.thumbnail,
				icon: () => '🎥',
			};
		},
	},
});