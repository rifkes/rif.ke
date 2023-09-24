import groq from 'groq';
import { ITEM_CONTENT } from './itemContent';

export const HOMEPAGE = groq`
  *[_type == 'homePage'][0] {
    items[] {
      _type,
      (_type == 'item') => {
        item -> {
          ${ITEM_CONTENT}
        },
      },
      (_type == 'textSection') => {
        "text": textSectionText,
      },
    },
    seoTags[],
    seoDescription,
  }
`;