import groq from 'groq';
import { ITEM_CONTENT } from './itemContent';

export const HOMEPAGE = groq`
  *[_type == 'homePage'][0] {
		'items': *[_type == 'item'] | order(orderRank) { ${ITEM_CONTENT} },
  }
`;