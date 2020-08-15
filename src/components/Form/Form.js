import PropTypes from 'prop-types'
import React, { Component } from 'react'
import debounce from 'lodash.debounce'
import { Button, Form, Input, Modal, Select } from 'semantic-ui-react'

import { callAll } from 'helpers'
import './Form.css'

const DEBOUNCE_WAIT = 1000

class AddPointForm extends Component {
	state = {
		address: 'Тверская 13',
		coordinates: null,
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

	get options() {
		return this.props.categories.map(({ id, name }) => ({
			key: id,
			text: name,
			value: id
		}))
	}

	get suggestions() {
		return this.props.locations.map(({ id, name }) => ({
			key: id,
			text: name,
			value: id
		}))
	}

	get isValid() {
		const { coordinates, address } = this.state

		return !!coordinates && !!address
	}

	toggleModal = () => this.setState(state => ({ showModal: !state.showModal }))

	inputAddress = ({ target }) => this.setState({ address: target.value })

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
		const { address, coordinates } = this.state

		handlers.onAddPoint({
			coordinates,
			name: 'Еще один кинотеатр',
			address,
			description: 'Some description....',
			category: 'cinema'
		})

		this.toggleModal()
	}

	searchByAddressDebounced = debounce(this.searchByAddress, DEBOUNCE_WAIT)

	render() {
		const { handlers, locations } = this.props
		const { address, showModal } = this.state

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
							value="Еще один кинотеатр"
						/>

						<Form.Field
							control={Input}
							onChange={callAll(
								this.inputAddress,
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
							options={this.options}
							value="cinema"
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
