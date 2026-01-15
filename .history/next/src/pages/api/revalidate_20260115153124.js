import { apiVersion, dataset, projectId } from '../../sanity.config'
import { createClient, groq } from 'next-sanity'

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
  try {
    if (req.method !== 'POST') {
      res.setHeader('Allow', 'POST')
      return res.status(405).json({ message: 'Method Not Allowed' })
    }

    const sanitySecret = process.env.SANITY_REVALIDATE_SECRET
    const secret = req.headers['x-sanity-secret']

    console.log('Revalidate called', {
      sanitySecretSet: !!sanitySecret,
      gotSecret: !!secret,
    })

    const bodyJson = await readRawBody(req)
    console.log('Raw body from Sanity:', bodyJson)

    let body
    try {
      body = JSON.parse(bodyJson)
    } catch (e) {
      console.error('Failed to parse JSON body', e)
      return res.status(400).json({ message: 'Invalid JSON body' })
    }

    if (sanitySecret !== secret) {
      console.error('Invalid secret', { sanitySecret, secret })
      return res.status(401).json({ message: 'Invalid secret' })
    }

    if (typeof body._id !== 'string' || !body._id) {
      const invalidId = 'Invalid _id'
      console.error(invalidId, { body })
      return res.status(400).send(invalidId)
    }

    const staleRoutes = ['/'] // add more later if needed
    console.log('Revalidating routes:', staleRoutes)

    await Promise.all(staleRoutes.map((route) => res.revalidate(route)))

    const updatedRoutes = `Updated routes: ${staleRoutes.join(', ')}`
    console.log(updatedRoutes)
    return res.status(200).send(updatedRoutes)
  } catch (err) {
    console.error('Error in revalidate', err)
    return res.status(500).send(err.message)
  }
}
