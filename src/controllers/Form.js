import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from 'actions'

const FormController = ({
	children, categories, locations, onAddPoint, onClearSearchResults,
	onSearchByAddress, onSetMapCenter
}) => (
	React.cloneElement(
		children,
		{
			categories,
			locations,
			handlers: {
				onAddPoint,
				onClearSearchResults,
				onSearchByAddress,
				onSetMapCenter
			}
		}
	)
)

export default connect(
	state => ({
		categories: state.categories,
		locations: state.locations
	}),
	dispatch => bindActionCreators({
		onAddPoint: actions.addPoint,
		onClearSearchResults: actions.clearSearchResults,
		onSearchByAddress: actions.searchByAddress,
		onSetMapCenter: actions.setMapCenter
	}, dispatch)
)(FormController)
