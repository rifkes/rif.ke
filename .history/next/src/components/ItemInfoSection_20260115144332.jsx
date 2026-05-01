import { motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';

const ItemInfoSection = () => {
  const { activeItem } = useSiteGlobals();

  return (
    <motion.div
      { ...fadeInOutVariants }
      className='fixed top-0 left-0 w-screen h-screen flex flex-col justify-start z-[999] text-white mix-blend-difference uppercase'
      style={ {
        maskImage: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        mask: 'linear-gradient(to bottom, rgba(255, 255, 255, 1), rgba(0, 0, 0, 0))',
        WebkitMask: 'linear-gradient(to bottom, rgba(0, 0, 0, 0) 10px, rgba(255, 255, 255, 1) 40px, rgba(255, 255, 255, 1) calc(100% - 40px), rgba(0, 0, 0, 0) calc(100% - 10px))',
      } }
    >
      <div className='max-h-full w-full overflow-y-scroll py-12 px-2'>
        {
          <h2 className='mb-2'>{ activeItem.title }</h2>
        }
        {
          activeItem?.description &&
          <p className='mb-8'>{ activeItem.description }</p>
        }
        {
          activeItem?.client &&
          <p className='mb-2'>Client: { activeItem.client }</p>
        }
        {
          activeItem?.role &&
          <p className='mb-2'>Role: { activeItem.role }</p>
        }
        {
          activeItem?.credits?.length > 0 &&
          <div className='mb-8'>
            <p className='inline'>Credits: </p>
            <ul className='list-none inline'>
              {
                activeItem.credits.map((credit, index) => (
                  <li
                    className="inline after:text-white after:mr-2 after:content-[','] last:after:content-none"
                    key={ index }
                  >{ credit.person }—{ credit.role }</li>
                ))
              }
            </ul>
          </div>
        }
        {
          activeItem?.url &&
          <p className='mb-2'>
              Visit: <a
              href={ activeItem.url }
              target='_blank'
              rel='noopener noreferrer'
              className='after:text-white after:ml-2 after:content-[→]'
              >{ activeItem.url.replace('https://', '').replace('http://', '') }</a>
          </p>
        }
      </div>
    </motion.div>
  )
};

export default ItemInfoSection;