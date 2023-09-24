import client from '../hooks/useSanityQuery';
import { HOMEPAGE } from '@/fragments/homePage';
import { SETTINGS } from '@/fragments/settings';

const getGlobalProps = async () => {
  const settings = await client.fetch(SETTINGS, {}); 
  const homepage = await client.fetch(HOMEPAGE, {});

  return {
    settings,
    homepage,
  };
};

export default getGlobalProps;