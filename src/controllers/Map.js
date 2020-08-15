import React from 'react'
import { connect } from 'react-redux'

const MapController = ({ children, categories, points }) => {
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
				points: visiblePoints
			}
		)
	)
}

export default connect(
	state => ({
		categories: state.categories,
		points: state.points
	})
)(MapController)
