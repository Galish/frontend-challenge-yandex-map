import React from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

import actions from 'actions'

const CategoriesController = ({ children, categories, onToogleCategory }) => (
	React.cloneElement(
		children,
		{
			categories,
			handlers: {
				onToogleCategory
			}
		}
	)
)

export default connect(
	state => ({
		categories: state.categories
	}),
	dispatch => bindActionCreators({
		onToogleCategory: actions.toggleCategory
	}, dispatch)
)(CategoriesController)
