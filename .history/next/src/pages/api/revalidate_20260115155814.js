/**
 * This code is responsible for revalidating the cache when a project or person is updated.
 *
 * It is set up to receive a validated GROQ-powered Webhook from Sanity.io:
 * https://www.sanity.io/docs/webhooks
 *
 * 1. Go to the API section of your Sanity project on sanity.io/manage or run `npx sanity hook create`
 * 2. Click 'Create webhook'
 * 3. Set the URL to https://YOUR_NEXTJS_SITE_URL/api/revalidate
 * 4. Trigger on: 'Create', 'Update', and 'Delete'
 * 5. Filter: _type == 'project' || _type == 'person' || _type == 'settings'
 * 6. Projection: Leave empty
 * 7. HTTP method: POST
 * 8. API version: v2021-03-25
 * 9. Include drafts: No
 * 10. HTTP Headers: Leave empty
 * 11. Secret: Set to the same value as SANITY_REVALIDATE_SECRET (create a random one if you haven't)
 * 12. Save the configuration
 * 13. Add the secret to Vercel: `npx vercel env add SANITY_REVALIDATE_SECRET`
 * 14. Redeploy with `npx vercel --prod` to apply the new environment variable
 */

// Pages Router needs raw body for signature verification
export const config = {
  api: { bodyParser: false },
}

async function readRawBody(req) {
  const chunks = []
  for await (const chunk of req) {
    chunks.push(typeof chunk === 'string' ? Buffer.from(chunk) : chunk)
  }
  return Buffer.concat(chunks).toString('utf8')
}

export default async function revalidate(req, res) {

	console.log('revalidate.js', {
		method: req.method,
		time: new Date().toISOString(),
	});

  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ message: 'Method Not Allowed' })
    }

		const sanitySecret = process.env.SANITY_REVALIDATE_SECRET
		const secret = req.headers['x-sanity-secret']

		console.log(sanitySecret === secret ? 'secret is valid' : 'secret is invalid');

		const bodyJson = await readRawBody(req);
		const body = JSON.parse(bodyJson);

		if (sanitySecret !== secret) {
			return res.status(401).json({ message: 'Invalid secret ' + sanitySecret + ' ' + secret });
		}

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id' 
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    // Compute and revalidate the affected routes
    const staleRoutes = ['/']
    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error(err, 'error in revalidate')
    return res.status(500).send(err.message)
  }
}
