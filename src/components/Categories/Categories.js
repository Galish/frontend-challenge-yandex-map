import PropTypes from 'prop-types'
import React from 'react'
import { Checkbox } from 'semantic-ui-react'
import './Categories.css'

const Categories = ({ categories, handlers }) => (
	<div className="categories">
		{categories.map(({ id, name, selected }) => (
			<div
				className="category"
				key={id}
			>
				<Checkbox
					key={id}
					onChange={handlers.onToogleCategory.bind(this, id)}
					checked={selected}
					label={name}
				/>
			</div>
		))}
	</div>
)

Categories.propTypes = {
	handlers: PropTypes.shape({
		onToogleCategory: PropTypes.func
	}),
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			selected: PropTypes.bool
		})
	)
}

Categories.defaultProps = {
	handlers: {},
	categories: []
}

export default Categories
