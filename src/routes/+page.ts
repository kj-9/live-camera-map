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
		const feature = {
			type: 'Feature',
			properties: {
				name: item.name,
				org: item.org,
				id: item.video.id,
				bearing: item.position.bearing
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
