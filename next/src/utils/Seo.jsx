import Head from 'next/head';
import { useSiteGlobals } from '../utils/SiteGlobalsContext';

const Seo = (props) => {
  const { seoImage, title, image, } = props;
  const { siteGlobals } = useSiteGlobals();

  return (
    <Head>
      <title>{ `${ siteGlobals?.settings?.siteTitle ? siteGlobals.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` }</title>
      <meta property='og:title' content={ `${ siteGlobals?.settings?.siteTitle ? siteGlobals.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` } />
      <meta property='twitter:title' content={ `${ siteGlobals?.settings?.siteTitle ? siteGlobals.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` } />
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="description" content={ siteGlobals?.settings?.seoDescription } />
      <meta property='og:description' content={ siteGlobals?.settings?.seoDescription } />
      <meta property='twitter:description' content={ siteGlobals?.settings?.seoDescription } />
      {
        seoImage?.url ?
          <meta property="og:image" content={ seoImage.url } />
          :
        image?.url ?
          <meta property="og:image" content={ image.url } />
          :
        siteGlobals?.settings?.seoImage?.url ?
          <meta property="og:image" content={ siteGlobals?.settings?.seoImage.url } />
          :
        <></>
      }
      {
        seoImage?.url ?
          <meta property="twitter:image" content={ seoImage.url } />
          :
        image?.url ?
          <meta property="twitter:image" content={ image.url } />
          :
        siteGlobals?.settings?.seoImage?.url ?
          <meta property="twitter:image" content={ siteGlobals?.settings?.seoImage.url } />
          :
        <></>
      }
      <meta property="og:url" content="https://rif.ke/" />
      {
        siteGlobals?.settings?.seoTags?.length > 0 &&
        <meta name="keywords" content={ `${ siteGlobals.settings.seoTags.join(', ') }` } />
      }
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {
        siteGlobals?.settings?.favicon?.url ?
          <link rel="icon" href={ siteGlobals.settings.favicon.url } /> :
          <link rel="icon" href="/favicon.ico" />
      }
      <meta property='og:site_name' content={ siteGlobals?.settings?.siteTitle ? siteGlobals.settings.siteTitle : 'Rifke' } />
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
    </Head>
  )
};

export default Seo;

export const runtime = 'edge';
export const isStatic = true;