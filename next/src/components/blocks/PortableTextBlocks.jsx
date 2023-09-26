import { PortableText } from '@portabletext/react';
import ListBlock from './BlockList';
import LinkAnnotation from '../annotations/LinkAnnotation';

export const portableTextComponents = {
  // Lists
  list: ListBlock,
  // Marks
  marks: {
    annotationLinkEmail: LinkAnnotation,
    annotationLinkExternal: LinkAnnotation,
    annotationLinkInternal: LinkAnnotation,
  },
}

export default function PortableTextBlocks({ value }) {
  if (!value) return null;
  return (
    <PortableText
      value={ value }
      components={ portableTextComponents }
    />
  );
}
