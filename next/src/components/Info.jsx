import { motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';
import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import PortableTextBlocks from './blocks/PortableTextBlocks';

const Info = () => {

  const { siteGlobals } = useSiteGlobals();

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
        {
          siteGlobals?.settings?.info &&
          siteGlobals.settings.info.map((item, index) => (
            <div className='mt-2 mb-2' key={ index }>
              {
                item.title?.length > 0 &&
                <h3 className='inline'>{ item.title }: </h3>
              }
              {
                item.text?.length > 0 &&
                <div className='inline children-inline'>
                  <PortableTextBlocks value={ item.text } />
                </div>
              }
            </div>
          ))
        }
        <div className='mt-8 w-full'>
          {
            siteGlobals?.settings?.contactItems &&
            siteGlobals.settings.contactItems.map((item, index) => (
              <p className='mt-2 mb-2' key={ index }>
                {
                  item._type === 'linkExternal' ?
                    <a
                      key={ index }
                      href={ item.url }
                      target='_blank'
                      rel='noreferrer'
                    >{ item.title }</a>
                    :
                    <a
                      key={ index }
                      href={ item.email }
                      target='_blank'
                      rel='noreferrer'
                    >{ item.email }</a>
              }
              </p>
            ))
          }
        </div>
      </div>
    </motion.div>
  )
}

export default Info;