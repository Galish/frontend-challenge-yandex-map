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
			id: 'cinema',
			name: 'Кинотеатры',
			selected: false
		}
	],
	locations: [],
	points: [
		{
			coordinates: [ 55.833436, 37.715175 ],
			name: 'Night Club 1',
			address: 'address here',
			description: 'Some description....',
			category: 'club'
		},
		{
			coordinates: [ 55.687086, 37.529789 ],
			name: 'Fast Food Restaurant',
			address: 'address here',
			description: 'Some description....',
			category: 'restaurant'
		},
		{
			coordinates: [ 55.782392, 37.614924 ],
			name: 'Italian Restaurant',
			address: 'address here',
			description: 'Some description....',
			category: 'restaurant'
		},
		{
			coordinates: [ 55.642063, 37.656123 ],
			name: 'CinemaPark',
			address: 'address here',
			description: 'Some description....',
			category: 'cinema'
		},
		{
			coordinates: [ 55.826479, 37.487208 ],
			name: 'Night Club 2',
			address: 'address here',
			description: 'Some description....',
			category: 'club'
		},
		{
			coordinates: [ 55.694843, 37.435023 ],
			name: 'Caro Premier',
			address: 'address here',
			description: 'Some description....',
			category: 'cinema'
		},
		{
			coordinates: [ 55.790139, 37.814052 ],
			name: 'Night Club 3',
			address: 'address here',
			description: 'Some description....',
			category: 'club'
		}
	]
}

const reducers = (state = initialState, action) => {
	switch (action.type) {

	case 'ADD_POINT': {
		return {
			...state,
			points: [
				...state.points,
				action.payload
			]
		}
	}

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

	case 'SET_LOCATIONS': {
		return {
			...state,
			locations: action.payload
		}
	}

	case 'CLEAR_LOCATIONS': {
		return {
			...state,
			locations: initialState.locations
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
