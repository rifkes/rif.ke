import { createClient } from '@sanity/client';

import sanityConfig from '../sanity.config';

const client = createClient(sanityConfig);

export default client;