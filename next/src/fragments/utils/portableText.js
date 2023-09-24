import groq from 'groq';
import { MARK_DEFS } from './markDefs';

export const PORTABLE_TEXT = groq`
  ...,
  _type,
  markDefs[] {
    ${MARK_DEFS}
  }
`;
