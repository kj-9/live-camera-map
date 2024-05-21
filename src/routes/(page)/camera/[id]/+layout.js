import { error } from '@sveltejs/kit';
import data from '../../../../data/livecams.json';

/** @type {import('./$types').PageLoad} */ export function load({ params }) {
	// get record from data matching id
	console.log(params.id);
	const record = data.find((record) => record.name === params.id);
	console.log(record);

	if (record) {
		return record;
	}
	error(404, 'Not found');
}
