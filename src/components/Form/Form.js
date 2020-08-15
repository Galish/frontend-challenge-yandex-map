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

	toggleModal = () => this.setState(state => ({ showModal: !state.showModal }))

	inputAddress = ({ target }) => this.setState({ address: target.value })

	searchByAddress = () => {
		const { handlers } = this.props
		const { address } = this.state

		handlers.onSearchByAddress(address)
	}

	searchByAddressDebounced = debounce(this.searchByAddress, DEBOUNCE_WAIT)

	render() {
		const { locations } = this.props
		const { address, showModal } = this.state

		console.log('locations:', this.props.locations);

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
						onSubmit={e => {
							e.preventDefault()

							console.log('!!!');
						}}
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
								this.searchByAddressDebounced
							)}
							label="Адрес"
							value={address}
							list="address-list"
						/>

						<datalist id="address-list">
							{locations.map(({ id, name })=> (
								<option
									key={name}
									value={name}>
									{name}
								</option>
							))}
						</datalist>

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
