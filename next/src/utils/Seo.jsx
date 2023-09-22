import Head from 'next/head';
import { GoogleAnalytics } from 'nextjs-google-analytics';
import { useSiteGlobals } from '../utils/SiteGlobalsContext';

const Seo = (props) => {
  const { seoDescription, seoImage, title } = props;
  const { siteGlobals } = useSiteGlobals();

  if (siteGlobals?.settingsData) {
    return (
      <Head>
        {
          siteGlobals.settingsData.siteTitle &&
          <title>{ `${ siteGlobals.settingsData.siteTitle }${ title ? ` | ${ title }` : '' }` }</title>
        }
        {
          siteGlobals.settingsData.gaMeasurementId &&
          <GoogleAnalytics trackPageViews gaMeasurementId={ siteGlobals.settingsData.gaMeasurementId } />
        }
        {
          siteGlobals.settingsData.seoTags &&
          <meta name="keywords" content={ `${ siteGlobals.settingsData.seoTags.join(', ') }` } />
        }
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {
          siteGlobals.settingsData?.favicon?.url ?
            <link rel="icon" href={ siteGlobals.settingsData.favicon.url } /> :
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