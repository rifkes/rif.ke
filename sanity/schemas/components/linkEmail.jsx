import { EnvelopeIcon } from '@sanity/icons'

export default {
  title: 'Email Link',
  name: 'linkEmail',
  type: 'object',
  icon: EnvelopeIcon,
  fields: [
    // Email
    {
      title: 'Email',
      name: 'email',
      type: 'email',
    },
  ],
  preview: {
    select: {
      title: 'email',
    },
    prepare(selection) {
      const { title } = selection

      return {
        subtitle: 'Email',
        title,
      }
    },
  },
}
