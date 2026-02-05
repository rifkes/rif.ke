import { useEffect, useRef, useState } from 'react';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import Hls from 'hls.js';

const MuxVideoPlayer = (props) => {
	const { windowHeight, windowWidth, } = useSiteGlobals();

	const { value } = props;

	const playButtonRef = useRef(null);
	const inactivityTimeoutRef = useRef(null);
	const videoRef = useRef(null);
	const [currentTime, setCurrentTime] = useState(0);
	const [duration, setDuration] = useState(0);

	const [isPlaying, setIsPlaying] = useState(false);
	const [canPlay, setCanPlay] = useState(false);

	const idleTimeoutRef = useRef(null);

	const [ scrubberIsVisible, setScrubberIsVisible ] = useState(false);
	
	const scrubVisualiser = useRef(null);

	useEffect(() => {
		const intersectionObserver = new IntersectionObserver((entries) => {
			entries.forEach((entry) => {
				if (entry.isIntersecting) {
					videoRef.current?.play();
				} else {
					videoRef.current?.pause();
				}
			});
		});
		intersectionObserver.observe(videoRef.current);
		return () => intersectionObserver.disconnect();
	}, []);
	
	useEffect(() => {
		const handleClick = () => {
			if (videoRef.current?.paused) {
				videoRef.current?.play();
			}
		}

		window.addEventListener('click', handleClick);

		return () => {
			window.removeEventListener('click', handleClick);
		}
	}, []);

	useEffect(() => {
		const handleInteraction = () => {
			if (playButtonRef.current) {
				playButtonRef.current.style.opacity = 1;
				clearTimeout(inactivityTimeoutRef.current);
				inactivityTimeoutRef.current = setTimeout(() => {
					if (playButtonRef.current && isPlaying) {
						playButtonRef.current.style.opacity = 0;
					}
				}, 1000);
			}
		};

		if (!isPlaying && playButtonRef?.current) {
			playButtonRef.current.style.opacity = 1;
		}

		if (!playButtonRef.current) {
			return;
		}

		playButtonRef.current.addEventListener('mouseenter', handleInteraction);
		playButtonRef.current.addEventListener('mousemove', handleInteraction);
		playButtonRef.current.addEventListener('mouseleave', handleInteraction);
		playButtonRef.current.addEventListener('touchstart', handleInteraction);
		playButtonRef.current.addEventListener('touchmove', handleInteraction);
		playButtonRef.current.addEventListener('touchend', handleInteraction);

		return () => {
			if (playButtonRef.current) {
				playButtonRef.current.removeEventListener('mouseenter', handleInteraction);
				playButtonRef.current.removeEventListener('mousemove', handleInteraction);
				playButtonRef.current.removeEventListener('mouseleave', handleInteraction);
				playButtonRef.current.removeEventListener('touchstart', handleInteraction);
				playButtonRef.current.removeEventListener('touchmove', handleInteraction);
			}
			clearTimeout(inactivityTimeoutRef.current);
		};
	}, [ isPlaying, ]);
		
	useEffect(() => {
		const video = videoRef.current;
		const hls = new Hls();

		if (video && value?.hlsUrl) {
			const url = value?.hlsUrl;

			if (Hls.isSupported()) {
				hls.loadSource(url);
				hls.attachMedia(video);
			} else if (video.canPlayType('application/vnd.apple.mpegurl')) {
				video.src = url;
			}

			const updateTime = () => {
				setCurrentTime(video.currentTime);
				setDuration(video.duration);
				if (scrubVisualiser.current) {
					const scrubWidth = (video.currentTime / video.duration);
					scrubVisualiser.current.style.transform = `scaleX(${scrubWidth})`;
				}
			};

			let raf;

			const animate = () => {
				if (video) {
					updateTime();
				}
				raf = requestAnimationFrame(animate);
			};

			animate();

			video.addEventListener('timeupdate', updateTime);
			video.addEventListener('loadedmetadata', updateTime);

			video.play().catch(error => {
			});

			return () => {
				video.removeEventListener('timeupdate', updateTime);
				video.removeEventListener('loadedmetadata', updateTime);
				cancelAnimationFrame(raf);
				if (typeof hls?.destroy === 'function') {
					// hls.destroy();
				}
			};
		}
	}, [value?.hlsUrl,]);

	const handleScrub = (e) => {
		const video = videoRef.current;
		const newTime = parseFloat(e.target.value);
		if (video) {
			video.currentTime = newTime;
			setCurrentTime(newTime);
		}
	};

	const handleStartScrub = (e) => {
		if (e.target.closest('.caption-stuff')) {
			return;
		}
		const video = videoRef.current;
		if (video) {
			video.pause();
		}
		if (scrubVisualiser.current) {
			scrubVisualiser.current.style.transition = 'none';
		}
	};

	const handleScrubTo = (e) => {
		if (e.touches) {
			const amountScrubbed = (e.touches[0].clientX / window.innerWidth) * duration;
			if (videoRef.current) {
				handleStartScrub(e);
				videoRef.current.currentTime = amountScrubbed;
				setCurrentTime(amountScrubbed);
			}
		}
	};

	const handleEndScrub = (e) => {
		const video = videoRef.current;
		if (video) {
			video.play();
		}
	};

	return (
		<div
			className='w-full h-full top-0 bg-black relative group'
			style={{
				aspectRatio: `${value?.width} / ${value?.height}`,
			}}
		>
			<div className='w-full h-full relative'>
				<video
					className='w-full h-full object-cover'
					ref={videoRef}
					controls={false}
					playsInline
					loop
					muted={true}
					className='w-full h-full object-cover'
					onCanPlay={ () => setCanPlay(true) }
					onPlay={ () => setIsPlaying(true) }
					onPause={ () => setIsPlaying(false) }
					style={ {
						objectFit: !value?.fullscreen ? 'contain' : 'cover',
					} }
				/>
				<div className='absolute bottom-0 left-0 w-full h-full z-[2] group flex items-center justify-center transition-opacity duration-300'>
					<input
						type='range'
						className='w-full h-full opacity-0 block top-0 left-0 z-[99]'
						min={0}
						max={duration || 0}
						step={0.01}
						value={currentTime}
						onChange={handleScrub}
						onMouseEnter={() => {
							setScrubberIsVisible(true);
							clearTimeout(idleTimeoutRef.current);
							idleTimeoutRef.current = setTimeout(() => {
								setScrubberIsVisible(false);
							}, 1000);
						}}
						onMouseMove={() => {
							setScrubberIsVisible(true);
							clearTimeout(idleTimeoutRef.current);
							idleTimeoutRef.current = setTimeout(() => {
								setScrubberIsVisible(false);
							}, 1000);
						}}
						onMouseLeave={() => {
							setScrubberIsVisible(false);
						}}
						onMouseDown={handleStartScrub}
						onMouseUp={handleEndScrub}
						onTouchStart={(e) => {
							handleStartScrub(e);
							handleScrubTo(e);
						} }
						onTouchMove={handleScrubTo}
						onTouchEnd={handleEndScrub}
					/>
					{
						!isPlaying &&
						<button
							className='w-16 h-16 rounded-full bg-white flex items-center justify-center z-[101]'
							ref={playButtonRef}
							onClick={() => {
								if (isPlaying) {
									videoRef.current?.pause();
								} else {
									videoRef.current?.play()
								}
							}}
						>
							{
									isPlaying ?
								// Pause svg
								<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' className='w-8 h-8'>
									<path d='M6 19h4V5H6v14zm8-14v14h4V5h-4z' />
								</svg>
								:
									// Play
									<svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='black' className='w-8 h-8'>
										<polygon points='6 19 6 5 18 12' />
									</svg>
							}
						</button>
					}
				</div>
			</div>
			<div
				ref={scrubVisualiser}
				className='absolute top-0 left-0 w-full h-[4px] bg-black opacity-0 transition-opacity duration-300 pointer-events-none'
				style={{
					opacity: scrubberIsVisible ? 1 : 0,
					transform: `scaleX(${currentTime / duration})`,
					transformOrigin: 'top left',
				}}
			/>
		</div>
	);
}

export default MuxVideoPlayer;