export default function ListBlock(props) {
  const {children, type} = props;

  if (type === 'bullet') {
    return <ul className="">{children}</ul>;
  }

  if (type === 'number') {
    return <ol className="">{children}</ol>;
  }

  return null;
}
