import React from 'react'
import ReactDOM from 'react-dom/client'
import './index.css'
import App from './App'
import { HashRouter } from 'react-router-dom'
import { Provider } from 'react-redux'
import store from './store/store'

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
	<React.StrictMode>
		<Provider store={store}>
			<HashRouter hashType={'slash'}>
				<App />
			</HashRouter>
		</Provider>
	</React.StrictMode>
)
