// This can be false if you're using a fallback (i.e. SPA mode)
export const prerender = true;
import data from '../data/livecams.json';

/** @type {import('./$types').PageLoad} */
export function load({ params }) {
	// GeoJSONオブジェクトの初期化
	const geoJson = {
		type: 'FeatureCollection',
		features: []
	};

	// 提供されたデータをGeoJSON形式に変換する
	data.forEach((item) => {
		// remove items without coordinates
		if (item.position.center.length !== 2) {
			return;
		}
		const feature = {
			type: 'Feature',
			properties: {
				name: item.name,
				org: item.org,
				id: item.video.id,
				bearing: item.position.bearing || 0
			},
			geometry: {
				type: 'Point',
				coordinates: item.position.center
			}
		};
		geoJson.features.push(feature);
	});

	return geoJson;
}
