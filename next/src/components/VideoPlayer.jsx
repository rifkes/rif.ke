import { useState, Suspense, lazy, useCallback, useRef, useLayoutEffect, useEffect } from 'react';

const ReactPlayer = lazy(() => import('react-player'));

const VideoPlayer = (props) => {

  const { url, thumbnail } = props;
  const [ isPlaying, setIsPlaying ] = useState(false);
  const [ playerShouldPlay, setPlayerShouldPlay ] = useState(false);
  const [ ready, setReady ] = useState(false);
  const [ aspectRatio ] = useState(0.5625);
  const playerRef = useRef(null);

  const handleClickPlayButton = useCallback((e) => {
    setPlayerShouldPlay(true);
  }, []);

  useEffect(() => {
    if (ready === true) {
      window.addEventListener('click', handleClickPlayButton, 'once'); 
    }
  }, [ handleClickPlayButton, ready ]);

  return (
    <div
      className={ `relative w-full h-0 pb-[56.25%]` }
      onClick={ () => setPlayerShouldPlay(!playerShouldPlay) }
      style={{
        paddingBottom: 100 * aspectRatio + '%'
      }}
    >
      <div className="absolute w-full h-full select-none" style={{pointerEvents: 'none'}}>
        <Suspense fallback={<div>Loading video...</div>}>
          <ReactPlayer
            ref={ playerRef }
            url={ url }
            className="video-player__player"
            playsinline={ true }
            onReady={ () => {
              setPlayerShouldPlay(true);
              setReady(true);
            } }
            playing={ playerShouldPlay }
            onError={ (e) => {
              console.log('e', e);
              setPlayerShouldPlay(false);
            } }
            controls={ false }
            volume={ 1 }
            muted={ true }
            poster={ thumbnail }
            height={ '100%' }
            width={ '100%' }
            loop={ true }
            onPlay={ () => {
              setIsPlaying(true);
            } }
            onPause={ () => {
              setIsPlaying(false);
            } }
          />
        </Suspense>
      </div>
      {
        isPlaying === false &&
        <button
          className='absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 z-10 uppercase text-white mix-blend-difference'
          onClick={ handleClickPlayButton }
        >{ isPlaying === true ? 'pause' : 'play video' }</button>
      }
    </div>
  )
}

export default VideoPlayer;