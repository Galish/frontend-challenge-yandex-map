import PropTypes from 'prop-types'
import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { Button, Form, Input, Modal, Select, TextArea } from 'semantic-ui-react'

import { callAll } from 'helpers'
import './Form.css'

const DEBOUNCE_WAIT = 1000

class AddPointForm extends Component {
	state = {
		address: '',
		category: null,
		coordinates: null,
		description: '',
		name: '',
		showModal: false
	}

	button = (
		<Button
			className="add-button"
			color="red"
		>
			Добавить заведение
		</Button>
	)

	get categoryOptions() {
		return this.props.categories.map(({ id, name }) => ({
			key: id,
			text: name,
			value: id
		}))
	}

	get isValid() {
		const { showModal, ...formProps } = this.state

		return Object.values(formProps).every(value => !!value)
	}

	toggleModal = () => this.setState(state => ({ showModal: !state.showModal }))

	setFormValue = name => (_, { value }) => (
		this.setState({ [ name ]: value })
	)

	selectAddress = ({ coordinates, name: address }) => {
		this.setState({
			coordinates,
			address
		})

		this.props.handlers.onClearSearchResults()
	}

	searchByAddress = () => {
		const { handlers } = this.props
		const { address } = this.state

		handlers.onSearchByAddress(address)
	}

	onSubmit = e => {
		e.preventDefault()

		if (!this.isValid) {
			return
		}

		const { handlers } = this.props
		const { showModal, ...formProps } = this.state

		handlers.onAddPoint(formProps)
		this.toggleModal()
	}

	searchByAddressDebounced = debounce(this.searchByAddress, DEBOUNCE_WAIT)

	render() {
		const { handlers, locations } = this.props
		const { address, category, description, name, showModal } = this.state

		return (
			<Modal
				size="small"
				closeIcon
				open={showModal}
				onClose={this.toggleModal}
				onOpen={this.toggleModal}
				trigger={this.button}
			>
				<Modal.Content>
					<Form
						autoComplete="off"
						className="form"
						onSubmit={this.onSubmit}
					>
						<Form.Field
							control={Input}
							label="Название заведения"
							onChange={this.setFormValue('name')}
							value={name}
						/>

						<Form.Field
							control={Input}
							onChange={callAll(
								this.setFormValue('address'),
								this.searchByAddressDebounced,
								handlers.onClearSearchResults
							)}
							label="Адрес"
							value={address}
							list="address-list"
						/>

						{locations.map(location => (
							<div
								key={location.name}
								value={location.name}
								onClick={this.selectAddress.bind(this, location)}
							>
								{location.name}
							</div>
						))}

						<Form.Field
							control={Select}
							label="Категория"
							onChange={this.setFormValue('category')}
							options={this.categoryOptions}
							value={category}
						/>

						<Form.Field
							control={TextArea}
							label="Краткое описание"
							onChange={this.setFormValue('description')}
							rows={2}
							value={description}
						/>

						<Button type='submit'>
							Добавить
						</Button>
					</Form>
				</Modal.Content>
			</Modal>
		)
	}

}

AddPointForm.propTypes = {
	handlers: PropTypes.shape({
		onAddPoint: PropTypes.func,
		onClearSearchResults: PropTypes.func,
		onSearchByAddress: PropTypes.func
	}),
	categories: PropTypes.arrayOf(
		PropTypes.shape({
			id: PropTypes.string,
			name: PropTypes.string,
			selected: PropTypes.bool
		})
	),
	locations: PropTypes.arrayOf(
		PropTypes.shape({
			name: PropTypes.string,
			coordinates: PropTypes.arrayOf(
				PropTypes.number
			),
		})
	),
}

AddPointForm.defaultProps = {
	handlers: {},
	categories: [],
	locations: []
}

export default AddPointForm
