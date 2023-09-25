import { useEffect } from 'react';

const FlipHorizontal = () => {

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('flip-horizontal');
    return () => {
      body.classList.remove('flip-horizontal');
    };
  }, []);

  return null;
};

export default FlipHorizontal;