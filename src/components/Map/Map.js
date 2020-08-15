import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loadjs from 'loadjs'
import queryString from 'query-string'

import './Map.css'

const MAP_URL = 'https://api-maps.yandex.ru/2.1/'
const CONTAINER_ID = 'map'

class Map extends Component {
	state = {
		isReady: false
	}

	async componentDidMount() {
		await loadjs(
			this.getUrl(MAP_URL, this.props),
			{ returnPromise: true }
		)
		await this.mapLoaded()
		this.initMap(this.props)
	}

	componentDidUpdate() {
		if (!this.state.isReady) {
			return
		}

		this.addPoints(this.props.points)
	}

	getUrl = (baseUrl, { apiKey, language } = {}) => {
		const query = {
			apiKey,
			lang: language
		}

		return `${baseUrl}?${queryString.stringify(query)}`
	}

	mapLoaded = () => (
		new Promise(resolve => {
			this.ymaps = global.ymaps
			this.ymaps.ready(resolve)
		})
	)

	initMap = ({ center, zoom } = {}) => {
		this.map = new this.ymaps.Map(
			CONTAINER_ID,
			{
				center,
				zoom
			},
			{
				searchControlProvider: 'yandex#search'
			}
		)

		this.setState({ isReady: true })
	}

	generatePlacemarks = (points = []) => (
		points.map(({ coordinates, description, preset, iconColor  }) => (
			new this.ymaps.Placemark(
				coordinates,
				{
					balloonContent: description
				},
				{
					preset,
					iconColor
				}
			)
		))
	)

	addPoints = (points = []) => {
		this.generatePlacemarks(points).forEach(geoObject => (
			this.map.geoObjects.add(geoObject)
		))
	}

	render() {
		return (
			<div
				id={CONTAINER_ID}
				className="map"
			/>
		)
	}
}

Map.propTypes = {
	apiKey: PropTypes.string,
	center: PropTypes.arrayOf(
		PropTypes.number
	),
	language: PropTypes.string,
	points: PropTypes.arrayOf(
		PropTypes.shape({
			coordinates: PropTypes.arrayOf(
				PropTypes.number
			),
			description: PropTypes.string,
			preset: PropTypes.string,
			iconColor: PropTypes.string
		})
	),
	zoom: PropTypes.number
}

Map.defaultProps = {
	center: [ 55.76, 37.64 ],
	language: 'ru_RU',
	points: [
		{
			coordinates: [ 55.833436, 37.715175 ],
			description: 'Some text...',
			preset: 'islands#dotIcon',
			iconColor: '#735184'
		}
	],
	zoom: 10
}

export default Map
