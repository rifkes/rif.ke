import { useEffect } from 'react';
import { useSiteGlobals } from './SiteGlobalsContext';

const SetGlobalProps = (props) => {

  const { globalData } = props;
  const { setSiteGlobals } = useSiteGlobals();

  useEffect(() => {
    if (globalData) {
      setSiteGlobals(globalData);
    }
  }, [globalData, setSiteGlobals]);

  return null;
};

export default SetGlobalProps;