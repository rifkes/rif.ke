import Head from 'next/head';
import { useSiteGlobals } from '../utils/SiteGlobalsContext';

const Seo = (props) => {
  const { seoImage, title } = props;
  const { siteGlobals } = useSiteGlobals();

  if (siteGlobals?.settings) {
    return (
      <Head>
        {
          <title>{ `${ siteGlobals?.settings?.siteTitle ? siteGlobals.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` }</title>
        }
        {
          siteGlobals.settings.seoTags &&
          <meta name="keywords" content={ `${ siteGlobals.settings.seoTags.join(', ') }` } />
        }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {
          siteGlobals.settings?.favicon?.url ?
            <link rel="icon" href={ siteGlobals.settings.favicon.url } /> :
            <link rel="icon" href="/favicon.ico" />
        }
        {
          siteGlobals?.settings?.seoDescription &&
          <>
            <meta name="description" content={ siteGlobals.settings.seoDescription } />
            <meta property='og:description' content={ siteGlobals.settings.seoDescription } />
            <meta name='twitter:description' content={ siteGlobals.settings.seoDescription } />
          </>
        }
        {
          seoImage?.url &&
          <>
            <meta property="og:image" content={ seoImage.url } />
            <meta name="twitter:image" content={ seoImage.url } />
          </>
        }
        <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    );
  } else {
    return null;
  }
};

export default Seo;

export const runtime = 'edge';
export const isStatic = true;