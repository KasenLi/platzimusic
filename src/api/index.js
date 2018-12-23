import config from './config'

//const apiKey = config.apiKey
const { apiKey } = config
const URL = `https://ws.audioscrobbler.com/2.0/?method=geo.gettopartists&country=:country&api_key=${apiKey}&format=json&limit=:limit`

export default function getArtists(country, limit) {
	const url = URL.replace(':country', country)
	const url2 = url.replace(':limit', limit)
	return fetch(url2)
		.then(res => res.json())
		.then(json => json.topartists.artist)
}