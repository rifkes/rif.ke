import Head from 'next/head';

const Seo = (props) => {
  const { seoImage, title, image, seoDescription, globalData, } = props;

  return (
    <Head>
      <title>{ `${ globalData?.settings?.siteTitle ? globalData.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` }</title>
      <meta property='og:title' content={ `${ globalData?.settings?.siteTitle ? globalData.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` } />
      <meta property='twitter:title' content={ `${ globalData?.settings?.siteTitle ? globalData.settings.siteTitle : 'Rifke' }${ title ? ` | ${ title }` : '' }` } />
      
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="description" content={ seoDescription ?? globalData?.settings?.seoDescription } />
      <meta property='og:description' content={ seoDescription ?? globalData?.settings?.seoDescription } />
      <meta property='twitter:description' content={ seoDescription ?? globalData?.settings?.seoDescription } />
      {
        seoImage?.url ?
          <meta property="og:image" content={ seoImage.url } />
          :
        image?.url ?
          <meta property="og:image" content={ image.url } />
          :
        globalData?.settings?.seoImage?.url ?
          <meta property="og:image" content={ globalData?.settings?.seoImage.url } />
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
        globalData?.settings?.seoImage?.url ?
          <meta property="twitter:image" content={ globalData?.settings?.seoImage.url } />
          :
        <></>
      }
      <meta property="og:url" content="https://rif.ke/" />
      {
        globalData?.settings?.seoTags?.length > 0 &&
        <meta name="keywords" content={ `${ globalData.settings.seoTags.join(', ') }` } />
      }
      <meta name="viewport" content="width=device-width, initial-scale=1" />
      {
        globalData?.settings?.favicon?.url ?
          <link rel="icon" href={ globalData.settings.favicon.url } /> :
          <link rel="icon" href="/favicon.ico" />
      }
      <meta property='og:site_name' content={ globalData?.settings?.siteTitle ? globalData.settings.siteTitle : 'Rifke' } />
      <link rel="manifest" href="/manifest.json" crossorigin="use-credentials" />
    </Head>
  )
};

export default Seo;

export const runtime = 'edge';
export const isStatic = true;