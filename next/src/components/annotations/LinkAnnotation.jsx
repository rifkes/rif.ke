// prettier-ignore
import AnnotationLink from './AnnotationLink';

const LinkAnnotation = (mark) => {

  const { value, children, markType } = mark;
  const { cta } = value;

  return (
    <AnnotationLink
      value={value} markType={markType}
      className={`${cta === true ? 'border border-inherit rounded-md text-uppercase p-4 inline-block w-auto mx-auto my-6 text-center' : ''} underline-none`}
    >{children}</AnnotationLink>
  );
};

export default LinkAnnotation;