// prettier-ignore

const LinkEmailAnnotation = (props) => {
  const {children, mark} = props;
  return (
    <a
      className=""
      href={`mailto:${mark?.email}`}
    >
      <>{children}</>
    </a>
  );
};

export default LinkEmailAnnotation;
