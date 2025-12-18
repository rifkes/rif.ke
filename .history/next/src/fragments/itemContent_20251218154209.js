import groq from 'groq';
import { IMAGE } from './utils/image';

export const ITEM_CONTENT = groq`
  title,
  'slug': slug.current,
  'id': _id,
  client,
  description,
  url,
  backgroundImage {
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
  foregroundMedia {
    type,
    (type == 'video') => {
      videoEmbed {
        url,
        thumbnail {
          ${IMAGE}
        }
      },
    },
    (type == 'image') => {
      image {
        ${IMAGE}
      },
    },
  },
  role,
  credits [] {
    person,
    role,
  },
`;