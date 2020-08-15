import React from 'react'
import { connect } from 'react-redux'

const MapController = ({ children, categories, center, points }) => {
	const selectedCategories = categories
		.filter(({ selected}) => selected)
		.map(({ id }) => id)

	const visiblePoints = points.filter(({ category }) =>
		selectedCategories.includes(category)
	)

	return (
		React.cloneElement(
			children,
			{
				categories,
				center,
				points: visiblePoints
			}
		)
	)
}

export default connect(
	state => ({
		categories: state.categories,
		center: state.mapCenter,
		points: state.points
	})
)(MapController)
