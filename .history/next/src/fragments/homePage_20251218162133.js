import groq from 'groq';
import { ITEM_CONTENT } from './itemContent';

export const HOMEPAGE = groq`
  *[_type == 'homePage'][0] {
		'items': *[_type == 'item'] | order(orderRank) {
      _type,
      (_type == 'item') => {
        ${ITEM_CONTENT}
      },
    },
  }
`;