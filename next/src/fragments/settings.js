import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { LINK_EXTERNAL } from './utils/linkExternal';
import { LINK_EMAIL } from './utils/linkEmail';

export const SETTINGS = groq`
  *[_type == 'settings'][0] {
    contactLinks[] {
      _type,
      (_type == 'emailLink') => {
        ${LINK_EMAIL}
      },
      (_type == 'external') => {
        ${LINK_EXTERNAL}
      },
    },
    info[] {
      infoItemTitle,
      infoItemText [] {
        ${PORTABLE_TEXT}
      },
    },
    topRightLink {
      ${LINK_EXTERNAL}
    },
    seoTags[],
    seoDescription,
    gaMeasurementId,
  }
`;