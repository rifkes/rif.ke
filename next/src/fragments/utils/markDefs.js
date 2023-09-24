import groq from 'groq';
import { LINK_EXTERNAL } from './linkExternal';
import { LINK_INTERNAL } from './linkInternal';
import { LINK_EMAIL } from './linkEmail';

export const MARK_DEFS = groq`
	...,
	(_type == 'annotationLinkExternal') => {
		${LINK_EXTERNAL}
	},
	(_type == 'annotationLinkInternal') => {
		${LINK_INTERNAL}
	},
	(_type == 'annotationLinkEmail') => {
		${LINK_EMAIL}
	},
`;
