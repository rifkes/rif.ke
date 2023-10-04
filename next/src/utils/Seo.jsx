import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useSiteGlobals } from '../utils/SiteGlobalsContext';

const Seo = (props) => {
  const { seoDescription, seoImage, title } = props;
  const { siteGlobals } = useSiteGlobals();

  if (siteGlobals?.settings) {
    return (
      <Head>
        {
          siteGlobals.settings.siteTitle &&
          <title>{ `${ siteGlobals.settings.siteTitle }${ title ? ` | ${ title }` : '' }` }</title>
        }
        {
          siteGlobals.settings.gaMeasurementId &&
          <GoogleAnalytics trackPageViews gaMeasurementId={ siteGlobals.settings.gaMeasurementId } />
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
          seoDescription &&
          <>
            <meta name="description" content={ seoDescription } />
            <meta property='og:description' content={ seoDescription } />
            <meta name='twitter:description' content={ seoDescription } />
          </>
        }
        {
          seoImage?.url &&
          <>
            <meta property="og:image" content={ seoImage.url } />
            <meta name="twitter:image" content={ seoImage.url } />
          </>
        }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
    );
  } else {
    return null;
  }
};

export default Seo;