import { projectId } from '@/sanity.config';
import projects from '@/projects-archive-1-may-2026.json';
import pressAndAwards from '@/press-archive-1-may-2026.json';
import engagements from '@/engagements-archive-1-may-2026.json';
import teaching from '@/teaching-archive-1-may-2026.json';

export default async function handler(req, res) {

	console.log(req.body, projectId)
	const items = pressAndAwards;
	
	for (const item of items) {
		item._key = crypto.randomUUID();
		item.year = parseInt(item.year);
		if (item.hidden) {
			item.hidden = true;
		} else {
			item.hidden = false;
		}
	}


	try {

		const mutations = [{
			patch: {
				id: 'archive',
				set: {
					pressAndAwards: items,
				},
			}
		}];

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