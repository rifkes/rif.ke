import { createContext, useContext, useState } from 'react';

export const SiteGlobalsContext = createContext({
  siteGlobals: undefined,
  setSiteGlobals: async (siteGlobals) => null,
  backgroundImage: undefined,
  setBackgroundImage: async (backgroundImage) => null,
})

export const useSiteGlobals = () => useContext(SiteGlobalsContext)

export const SiteGlobalsProvider = ({ children }) => {
  const [ siteGlobals, setSiteGlobals ] = useState(null);
  const [ backgroundImage, setBackgroundImage ] = useState(null);

  return <SiteGlobalsContext.Provider value={ {
    siteGlobals, setSiteGlobals,
    backgroundImage, setBackgroundImage
  } }>{ children }</SiteGlobalsContext.Provider>;
}