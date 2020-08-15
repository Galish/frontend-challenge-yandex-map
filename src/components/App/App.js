import React from 'react'
import './App.css'

import Categories from 'components/Categories'
import CategoriesController from 'controllers/Categories'
import Map from 'components/Map'
import MapController from 'controllers/Map'
import CONSTANTS from 'constants'

function App() {
	return (
		<div className="container">
			<div className="panel">
				<CategoriesController>
					<Categories />
				</CategoriesController>
			</div>

			<div className="content">
				<MapController>
					<Map
						apiKey={CONSTANTS.API_KEY}
					/>
				</MapController>
			</div>
		</div>
	)
}

export default App;
