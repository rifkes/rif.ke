import groq from 'groq';
import { IMAGE } from './utils/image';
import { MUX_VIDEO } from './utils/muxVideo';

export const ARCHIVE = groq`
  *[_type == 'archive'].items[] {
		title,
		client,
		year,
		description,
		agency,
		type,
		thumbnailTypeIsVideo,
		image {
			${IMAGE}
		},
		video {
			'assetId': asset->id,
			'videoUrl': 'https://stream.mux.com/' + asset->playbackId + '/low.mp4',
			'videoUrlHigh': 'https://stream.mux.com/' + asset->playbackId + '/high.mp4',
			'hlsUrl': 'https://stream.mux.com/' + asset->playbackId + '.m3u8',
			'thumbnailUrl': 'https://image.mux.com/' + asset->playbackId + '/thumbnail.jpg?time=0',
			'width': asset->data.tracks[1].max_width,
			'height': asset->data.tracks[1].max_height,
		},
		tools,
		role,
		credits[] {
			person,
			role,
		},
		url,
  }
`;