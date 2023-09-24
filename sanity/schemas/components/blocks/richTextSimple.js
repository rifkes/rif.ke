export default {
  name: 'richTextSimple',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      lists: [],
      marks: {
        annotations: [
          // Internal
          {
            name: 'annotationLinkInternal',
            type: 'annotationLinkInternal',
          },
          // URL
          {
            name: 'annotationLinkExternal',
            type: 'annotationLinkExternal',
          },
          // Email
          {
            name: 'annotationLinkEmail',
            type: 'annotationLinkEmail',
          },
        ],
        decorators: [
          {
            title: 'Italic',
            value: 'em',
          },
          {
            title: 'Strong',
            value: 'strong',
          },
        ],
      },
      // Regular styles
      styles: [
      ],
      // Paragraphs
      type: 'block',
    },
  ],
}
