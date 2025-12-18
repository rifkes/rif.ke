import groq from 'groq';
import { IMAGE } from './utils/image';

export const ITEM_CONTENT = groq`
  title,
  "slug": slug.current,
  "id": _id,
  client,
  description,
  url,
  backgroundImage {
    ${IMAGE}
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