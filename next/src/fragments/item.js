import groq from 'groq';
import { ITEM_CONTENT } from './itemContent';

export const ITEM = groq`
  *[_type == 'item' && slug.current == $slug][0] {
    ${ITEM_CONTENT},
  }
`;