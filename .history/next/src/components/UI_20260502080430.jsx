import { useSiteGlobals } from '@/utils/SiteGlobalsContext';
import { useEffect } from 'react';
import ItemInfoSection from './ItemInfoSection';
import { AnimatePresence, motion } from 'framer-motion';
import { fadeInOutVariants } from '@/utils/framerMotionVariants';
import Link from 'next/link';
import { useRouter } from 'next/router';

const UI = () => {
	const { titleText, windowWidth, activeItem, infoIsActive, setInfoIsActive, itemInfoIsActive, setItemInfoIsActive, sillyNames, setSillyName, siteGlobals, infoSillyNames, setInfoSillyNames, } = useSiteGlobals();
	
	const router = useRouter();

  useEffect(() => {
    setItemInfoIsActive(false);
  }, [ activeItem, setItemInfoIsActive ]);

  return (
    <>
      <AnimatePresence mode='wait'>
        {
          activeItem?.title && itemInfoIsActive === true &&
          <ItemInfoSection key='itemInfo' />
        }
      </AnimatePresence>
      <Link
        href={ router.pathname === '/info' ? '/' : '/info' }
        className='select-none fixed top-0 left-0 p-2 uppercase ui-text z-[999]'
      >
        { router.pathname === '/info' ? 'Rifke' : 'Info' }
      </Link>
      <button
				onClick={() => {
					if (router.pathname !== '/info') {
						setSillyName(sillyNames[ Math.floor(Math.random() * sillyNames.length) ]);
					} else {
						setSillyName(infoSillyNames[ Math.floor(Math.random() * infoSillyNames.length) ]);
					}
        } }
        className='select-none fixed top-0 right-0 p-2 uppercase ui-text z-[999] cursor-pointer'
      >
        ♡
      </button>
      {
        siteGlobals?.settings?.mainEmailLink?.email &&
        <a
          href={ `mailto:${ siteGlobals.settings.mainEmailLink.email }` }
          target='_blank'
          rel='noopener noreferrer'
          className='select-none fixed bottom-0 left-0 p-2 uppercase ui-text z-[999]'
				>
					{siteGlobals.settings.mainEmailLink.email}
        </a>
      }
      {
        siteGlobals?.settings?.mainSocialLink?.url &&
        <a
					href={ siteGlobals.settings.mainSocialLink.url }
          target='_blank'
          rel='noopener noreferrer'
          className='select-none fixed bottom-0 right-0 p-2 uppercase ui-text z-[999]'
        >
          { siteGlobals.settings.mainSocialLink.title ?? siteGlobals.settings.mainSocialLink.url.replace('https://', '').replace('http://', '') }
        </a>
      }
    </>
  )
}

export default UI;