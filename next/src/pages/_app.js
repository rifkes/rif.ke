import '@/styles/globals.css'
import { SiteGlobalsProvider } from '@/utils/SiteGlobalsContext';
import Layout from './_layout';

export default function App({ Component, pageProps }) {
  return (
    <SiteGlobalsProvider>
      <Layout>
        <Component { ...pageProps } />
      </Layout>
    </SiteGlobalsProvider>
  );
}
