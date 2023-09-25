import { useEffect } from 'react';

const FlipVertical = () => {

  useEffect(() => {
    const body = document.querySelector('body');
    body.classList.add('flip-vertical');
    return () => {
      body.classList.remove('flip-vertical');
    };
  }, []);

  return null;
};

export default FlipVertical;