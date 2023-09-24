export default {
  name: 'richText',
  title: 'Rich Text',
  type: 'array',
  of: [
    {
      lists: [
        {title: 'Bullet', value: 'bullet'},
        {title: 'Numbered', value: 'number'},
      ],
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
        {
          title: 'Heading',
          value: 'h2',
        },
      ],
      // Paragraphs
      type: 'block',
    },
  ],
}
