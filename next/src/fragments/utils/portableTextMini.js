import groq from 'groq';
import {MARK_DEFS} from './markDefs';

export const PORTABLE_TEXT_MINI = groq`
  ...,
  markDefs[] {
    ${MARK_DEFS}
  }
`;
