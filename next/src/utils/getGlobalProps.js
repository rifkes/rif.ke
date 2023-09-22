import { PROJECTS_LIST } from '@/fragments/projectsList';
import client from '../hooks/useSanityQuery';
import { HOMEPAGE } from '@/fragments/homePage';

const getGlobalProps = async () => {
  const projectsList = await client.fetch(PROJECTS_LIST, {});
  const homepage = await client.fetch(HOMEPAGE, {});

  return {
    projectsList,
    homepage,
  };
};

export default getGlobalProps;