import React from 'react';
// import logo from './logo.svg';
// import './App.css';

import Layout from 'components/Layout'
import Map from 'components/Map'
import CONSTANTS from './constants'

function App() {
	return (
		<Layout>
			<Map
				apiKey={CONSTANTS.API_KEY}
			/>
		</Layout>
	)
}

export default App;
