import { createContext, useContext, useState } from 'react';

export const SiteGlobalsContext = createContext({
  siteGlobals: undefined,
  setSiteGlobals: async (siteGlobals) => null,
  backgroundImage: 'webcam',
  setBackgroundImage: async (backgroundImage) => null,
  isTouchscreen: false,
  setIsTouchscreen: async (isTouchscreen) => null,
  titleText: 'Rifke',
  setTitleText: async (titleText) => null,
  webcamAllowed: false,
  setWebcamAllowed: async (webcamAllowed) => null,
});

export const useSiteGlobals = () => useContext(SiteGlobalsContext)

export const SiteGlobalsProvider = ({ children }) => {
  const [ siteGlobals, setSiteGlobals ] = useState(null);
  const [ backgroundImage, setBackgroundImage ] = useState('/white.png');
  const [ isTouchscreen, setIsTouchscreen ] = useState(false);
  const [ titleText, setTitleText ] = useState('Rifke');
  const [ webcamAllowed, setWebcamAllowed ] = useState(false);

  return (
    <SiteGlobalsContext.Provider
      value={ {
        siteGlobals, setSiteGlobals,
        backgroundImage, setBackgroundImage,
        isTouchscreen, setIsTouchscreen,
        titleText, setTitleText,
        webcamAllowed, setWebcamAllowed,
      } }
    >{ children }</SiteGlobalsContext.Provider>
  );
}