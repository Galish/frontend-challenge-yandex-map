const initialState = {
	categories: [
		{
			id: 'club',
			name: 'Клубы',
			selected: true
		},
		{
			id: 'restaurant',
			name: 'Рестораны',
			selected: true
		},
		{
			id: 'cinemas',
			name: 'Кинотеатры',
			selected: false
		}
	],
	points: [
		{
			coordinates: [ 55.833436, 37.715175 ],
			description: 'Club 1',
			category: 'club'
		},
		{
			coordinates: [ 55.833436, 38.715175 ],
			description: 'Pestaurant 1',
			category: 'restaurant'
		},
		{
			coordinates: [ 54.833436, 37.715175 ],
			description: 'Restaurant 2',
			category: 'restaurant'
		}
	]
}

const reducers = (state = initialState, action) => {
	switch (action.type) {

	case 'SET_CATEGORIES': {
		return {
			...state,
			categories: action.payload
		}
	}

	case 'CLEAR_CATEGORIES': {
		return {
			...state,
			categories: initialState.list
		}
	}

	case 'TOGGLE_CATEGORY': {
		return {
			...state,
			categories: state.categories.map(item => {
				if (item.id !== action.payload) {
					return item
				}

				return {
					...item,
					selected: !item.selected
				}
			})
		}
	}

	default:
		return state
	}
}

export default reducers
