import PropTypes from 'prop-types'
import React, { Component } from 'react'
import loadjs from 'loadjs'
import queryString from 'query-string'

import './Map.css'

const MAP_URL = 'https://api-maps.yandex.ru/2.1/'
const CONTAINER_ID = 'map'
const ICONS = {
	cinema: {
		preset: 'islands#redCinemaIcon'
	},
	club: {
		preset: 'islands#greenNightClubIcon'
	},
	restaurant: {
		preset: 'islands#blueFoodIcon'
	},
}

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

	componentDidUpdate(prevProps) {
		const { center } = this.props

		if (prevProps.center !== center) {
			this.setMapCenter(center)
		}

		if (this.state.isReady) {
			this.addPoints(this.props.points)
		}
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

	setMapCenter = coordinates => this.map.setCenter(coordinates);

	generatePlacemarks = (points = []) => (
		points.map(({ address, category, coordinates, name, description  }) => (
			new this.ymaps.Placemark(
				coordinates,
				{
					balloonContentHeader: name,
					balloonContentBody: description,
					balloonContentFooter: address,
					hintContent: name
				},
				{
					preset: 'islands#yellowStarIcon',
					...ICONS[ category ]
				}
			)
		))
	)

	addPoints = (points = []) => {
		this.map.geoObjects.removeAll()

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
			name: PropTypes.string,
			address: PropTypes.string,
			description: PropTypes.string,
			category: PropTypes.string
		})
	),
	zoom: PropTypes.number
}

Map.defaultProps = {
	language: 'ru_RU',
	points: [],
	zoom: 10
}

export default Map
