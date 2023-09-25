import { motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';

const Info = () => {


  return (
    <motion.div
      { ...fadeInOutVariants }
      className='fixed top-0 left-0 w-screen h-screen flex flex-col justify-start z-[999] text-white mix-blend-difference'
      style={ {
        maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        mask: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        WebkitMask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 10px, rgba(255, 255, 255, 1) 40px, rgba(255, 255, 255, 1) calc(100% - 40px), rgba(0, 0, 0, 0) calc(100% - 10px))',
      } }
    >
      <div className='max-h-full w-full overflow-y-scroll py-12 px-2 uppercase'>
        <p className='mt-2 mb-2'>About: I collaborate with forward-thinking clients and friends across the arts, music and fashion on visual and interactive experiences.</p>
        <p className='mt-2 mb-2'>Services: Digital creative direction, digital design and art direction, interaction design, creative web development, animation, AR, VR</p>
        <p className='mt-2 mb-2'>Clients: Dazed, Google, The Face, Burberry, Warp, Universal Music, Somerset House, Claire Barrow, Ella Boucht, HÄN, Chopova Lowena, Abandon Normal Devices, Ben Ditto, The 1975, Beirut Re—Store</p>
        <p className='mt-2 mb-2'>Speaking: Iterations 2020, UEL, Creative Coding Meetup 2020</p>
        <p className='mt-2 mb-2'>Workshops/teaching: Iterations 2020, UEL, Creative Coding Meetup 2020</p>
      </div>
    </motion.div>
  )
}

export default Info;