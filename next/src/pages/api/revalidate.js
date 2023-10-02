/**
 * This code is responsible for revalidating the cache when a project or person is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click "Create webhook"
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: "Create", "Update", and "Delete"
 * 5. Filter: _type == "project" || _type == "person" || _type == "settings"
 * 6. Projection: Leave empty
 * 7. HTTP method: PROJECT
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the configuration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

import { apiVersion, dataset, projectId } from '../../sanity.config'
import { createClient, groq } from 'next-sanity'
import { parseBody } from 'next-sanity/webhook'

export { config } from 'next-sanity/webhook'

export default async function revalidate(req, res) {
  try {
    const { body, isValidSignature } = await parseBody(
      req,
      process.env.SANITY_REVALIDATE_SECRET
    )
    if (isValidSignature === false) {
      const message = 'Invalid signature'
      return res.status(401).send(message)
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = await queryStaleRoutes(body)
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${ staleRoutes.join(', ') }`
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err, 'error in revalidate')
    return res.status(500).send(err.message)
  }
}

async function queryStaleRoutes(body) {
  const client = createClient({ projectId, dataset, apiVersion, useCdn: false })

  // Handle possible deletions
  if (body._type === 'item') {
    const exists = await client.fetch(groq`*[_id == $id][0]`, { id: body._id })
    if (!exists && body._type === 'item') {
      let staleRoutes = [ '/' ];
      // if we ever make separate pages for items then sort that out here
      // if ((body.slug)?.current) {
      //   staleRoutes.push(`/item/${(body.slug).current}`)
      // }
      // Assume that the project document was deleted. Query the datetime used to sort "More stories" to determine if the project was in the list.
      return [...new Set([...staleRoutes])]
    }
  }

  switch (body._type) {
    case 'item':
      return await queryAllRoutes(client, body._id)
    case 'homePage':
      return await queryAllRoutes(client)
    case 'settings':
      return await queryAllRoutes(client)
    default:
      throw new TypeError(`Unknown type: ${body._type}`)
  }
}

// async function _queryAllRoutes(client) {
//   return await client.fetch(groq`*[_type == "item"].slug.current`)
// }

async function queryAllRoutes(client) {
  // const slugs = await _queryAllRoutes(client);

  return [
    '/',
    // ...slugs.map((slug) => `/item/${ slug }`)
  ];
}
