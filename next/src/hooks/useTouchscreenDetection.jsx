const useTouchscreenDetection = () => {

  const [isTouchscreen, setIsTouchscreen] = useState(false);

  useEffect(() => {
    const handleTouchStart = () => setIsTouchscreen(true);
    window && window.addEventListener('touchstart', handleTouchStart);
    return () => window && window.removeEventListener('touchstart', handleTouchStart);
  }, []);

  return isTouchscreen;
};

export default useTouchscreenDetection;