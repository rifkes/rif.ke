import client from '@/hooks/useSanityQuery';
import { projectId } from '@/sanity.config';
import groq from 'groq';
import { error } from 'console';
import archive from '@/projects-archive-1-may-2026.json';

export default async function handler(req, res) {

	const archiveItems = archive;
	
	for (const item of archiveItems) {
		item._key = crypto.randomUUID();
	}

	try {
		const response = await fetch(
			`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/production`,
			{
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
					Authorization: `Bearer ${process.env.SANITY_UPDATE_API_KEY}`,
				},
				body: JSON.stringify({ mutations, })
			}
		);

		if (!response?.ok) {
			throw new Error(`Sanity API responded with status: ${response.status}`);
		}

		return res.status(200).send(JSON.stringify({}));

		
	} catch (error) {
		return res.status(500).send(JSON.stringify({ message: 'no data, project id' + projectId }));
	}
}