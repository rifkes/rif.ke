import client from '@/hooks/useSanityQuery';
import { projectId } from '@/sanity.config';
import groq from 'groq';
import { error } from 'console';

export default async function handler(req, res) {

	console.log(req.body)

	if (req?.body?.timestamp) {

		console.log(req.body)
		
		try {
			const doc = await client.fetch(groq`*[_type == 'users'][0] {
				_id,
				users[],
			}`);

			const poemDoc = await client.fetch(groq`*[_type == 'poem'][0] {
				_id,
				poem[],
			}`);

			console.log(poemDoc)

			if (doc && poemDoc) {
				const users = doc.users || [];
				const poem = poemDoc.poem || [];

				const newUsers = [
					...users,
					{
						zazen: req.body.zazen,
						rockGazing: req.body.rockGazing,
						climbing: req.body.rockGazing,
						poem: req.body.poem,
						timestamp: req.body.timestamp,
						_key: 'user_' + req.body.timestamp,
						id: 'user_' + req.body.timestamp,
					},
				];

				const newPoem = [
					...poem,
					req.body.userSubmittedLine,
				];

				const mutations = [{
					patch: {
						id: doc._id,
						set: {
							users: newUsers,
						},
					}
				}];

				console.log('newPoem', newPoem)

				const poemMutations = [{
					patch: {
						id: poemDoc._id,
						set: {
							poem: newPoem,
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

				const poemResponse = await fetch(
					`https://${projectId}.api.sanity.io/v2021-06-07/data/mutate/production`,
					{
						method: 'POST',
						headers: {
							'Content-Type': 'application/json',
							Authorization: `Bearer ${process.env.SANITY_UPDATE_API_KEY}`,
						},
						body: JSON.stringify({ mutations: poemMutations, })
					}
				);

				if (!response?.ok || !poemResponse?.ok) {
					throw new Error(`Sanity API responded with status: ${poemResponse.status} ${poemResponse.status}`);
				}

				return res.status(200).send(JSON.stringify({ poem: newPoem, }));

			} else {
				return res.status(500).send(JSON.stringify({ message: 'whoops', error, }));
			}
			
		} catch (error) {
			return res.status(500).send(JSON.stringify({ message: 'no data, project id' + projectId }));
		}
	}
}