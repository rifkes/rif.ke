import groq from 'groq';
import { PORTABLE_TEXT } from './utils/portableText';
import { LINK_EXTERNAL } from './utils/linkExternal';
import { LINK_EMAIL } from './utils/linkEmail';
import { IMAGE } from './utils/image';

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
      "title": infoItemTitle,
      "text": infoItemText [] {
        ${PORTABLE_TEXT}
      },
    },
    mainEmailLink {
      ${LINK_EMAIL}
    },
    mainSocialLink {
      ${LINK_EXTERNAL}
    },
    siteTitle,
    favicon {
      ${IMAGE}
    },
    seoImage {
      ${IMAGE}
    },
    seoTags[],
    seoDescription,
    gaMeasurementId,
  }
`;