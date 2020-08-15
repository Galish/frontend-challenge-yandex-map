export default {
	toggleCategory: id => dispatch => {
		dispatch({
			type: 'TOGGLE_CATEGORY',
			payload: id
		})
	}
}
