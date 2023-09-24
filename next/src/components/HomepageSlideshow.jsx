const HomepageSlideshow = () => {

  return (
    <>
      <div className='w-full h-screen fixed top-0 left-0 z-10 hover-hover:overflow-y-scroll hover-none:overflow-hidden'>
        <div className='w-screen h-screen p-24' />
        <div className='w-screen h-screen p-24'>
          <img className='max-w-[50%] max-h-[50%] block relative top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 shadow-xl' src='/assets/image-0.jpg' />
        </div>
      </div>
      <button className='z-[999] select-none fixed top-1/2 -translate-y-1/2 left-0 p-2 uppercase mix-blend-difference text-white'>Previous</button>
      <button className='z-[999] select-none fixed top-1/2 -translate-y-1/2 right-0 p-2 uppercase mix-blend-difference text-white'>Next</button>
    </>
  );
}

export default HomepageSlideshow;