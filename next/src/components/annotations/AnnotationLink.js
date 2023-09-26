import Link from 'next/link';

const AnnotationLink = ({ value, className, markType, children }) => {

  return (
    <>
      {
        markType === 'annotationLinkInternal' && value.slug ?
          <Link
            className={className ?? undefined}
            href={value.slug}
          >{children}</Link>
          :
          <a
            className={className ?? undefined}
            href={value.url ? value.url : value.email ? `mailto:${value.email}` : undefined}
            target={value.newWindow || value.email ? '_blank' : '_self'}
            rel="noopener noreferrer"
          >{children}</a>
      }
    </>
  )
};

export default AnnotationLink;