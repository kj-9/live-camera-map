import { error } from '@sveltejs/kit';
import data from '../../../../data/livecams.json';

/** @type {import('./$types').PageLoad} */ export function load({ params }) {
	// get record from data matching id
	const record = data.find((record) => record.name === params.id);

	if (record) {
		return record;
	}
	error(404, 'Not found');
}
