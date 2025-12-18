import groq from 'groq';
import { ITEM_CONTENT } from './itemContent';

export const ITEMS_LIST = groq`
  *[_type == 'item'] | order(orderRank) {
    ${ITEM_CONTENT}
  }
`;