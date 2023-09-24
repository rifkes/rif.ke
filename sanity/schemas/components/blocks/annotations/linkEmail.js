/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
import { EnvelopeIcon } from '@sanity/icons'
export default {
  title: 'Email link',
  name: 'annotationLinkEmail',
  icon: EnvelopeIcon,
  type: 'object',
  fields: [
    // Email
    {
      title: 'Email',
      name: 'email',
      type: 'email',
    },
  ],
}
