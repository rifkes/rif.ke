import sanityClient from '@sanity/client';

import sanityConfig from '../sanity.config';

const client = sanityClient(sanityConfig);

export default client;