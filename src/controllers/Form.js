import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from 'actions'

const FormController = ({
	children, categories, locations, onClearSearchResults, onSearchByAddress
}) => (
	React.cloneElement(
		children,
		{
			categories,
			locations,
			handlers: {
				onClearSearchResults,
				onSearchByAddress
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
		onClearSearchResults: actions.clearSearchResults,
		onSearchByAddress: actions.searchByAddress
	}, dispatch)
)(FormController)
