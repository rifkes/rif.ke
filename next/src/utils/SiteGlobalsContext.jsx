import { createContext, useContext, useState } from 'react';

export const SiteGlobalsContext = createContext({
  siteGlobals: undefined,
  setSiteGlobals: async (siteGlobals) => null,
  backgroundImage: 'webcam',
  setBackgroundImage: async (backgroundImage) => null,
  isTouchscreen: false,
  setIsTouchscreen: async (isTouchscreen) => null,
});

export const useSiteGlobals = () => useContext(SiteGlobalsContext)

export const SiteGlobalsProvider = ({ children }) => {
  const [ siteGlobals, setSiteGlobals ] = useState(null);
  const [ backgroundImage, setBackgroundImage ] = useState('webcam');
  const [ isTouchscreen, setIsTouchscreen ] = useState(false);

  return (
    <SiteGlobalsContext.Provider
      value={ {
        siteGlobals, setSiteGlobals,
        backgroundImage, setBackgroundImage,
        isTouchscreen, setIsTouchscreen,
      } }
    >{ children }</SiteGlobalsContext.Provider>
  );
}