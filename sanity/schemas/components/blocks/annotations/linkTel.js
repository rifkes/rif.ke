/**
 * Annotations are ways of marking up text in the block content editor.
 *
 * Read more: https://www.sanity.io/docs/customization#f924645007e1
 */
import { EnvelopeIcon } from '@sanity/icons'
export default {
  title: 'Telephone link',
  name: 'annotationLinkTelephone',
  icon: EnvelopeIcon,
  type: 'object',
  fields: [
    // Telephone
    {
      title: 'Telephone',
      name: 'telephone',
      type: 'number',
    },
  ],
}
