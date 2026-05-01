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
			${MUX_VIDEO}
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