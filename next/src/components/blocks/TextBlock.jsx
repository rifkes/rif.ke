import { ReactNode } from 'react';

export default function TextBlock({children, node}) {
  if (node.style === 'h2') {
    return (
      <h2>
        {children}
      </h2>
    );
  }

  // Paragraphs
  return (
    <p>
      {children}
    </p>
  );
}
