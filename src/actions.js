import get from 'lodash.get'
import queryString from 'query-string'

import CONSTANTS from './constants'

const GEOCODE_URL = 'https://geocode-maps.yandex.ru/1.x/'

export default {
	addPoint: payload => (dispatch) => {
		dispatch({
			type: 'ADD_POINT',
			payload
		})
	},

	searchByAddress: value => async(dispatch) => {
		const query = {
			apikey: CONSTANTS.API_KEY,
			geocode: value,
			format: 'json'
		}

		const url = `${GEOCODE_URL}?${queryString.stringify(query)}`
		const response = await fetch(url)
		const jsonResponse = await response.json()
		const collection = get(jsonResponse, 'response.GeoObjectCollection.featureMember') || []
		const payload = collection.map(item => ({
			coordinates: get(item, 'GeoObject.Point.pos').split(' ').map(parseFloat).reverse(),
			name: `${get(item, 'GeoObject.name')}, ${get(item, 'GeoObject.description')}`
		}))

		dispatch({
			type: 'SET_LOCATIONS',
			payload
		})
	},

	clearSearchResults: () => dispatch => {
		dispatch({ type: 'CLEAR_LOCATIONS' })
	},

	toggleCategory: id => dispatch => {
		dispatch({
			type: 'TOGGLE_CATEGORY',
			payload: id
		})
	}
}
