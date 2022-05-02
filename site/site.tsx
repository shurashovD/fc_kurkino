import { hydrateRoot } from 'react-dom/client'
import { Provider } from 'react-redux'
import { BrowserRouter } from 'react-router-dom'
import App from './App'
import store from './app/store'
import './index.scss'

const container = document.getElementById('root')

if ( container ) {
	hydrateRoot(
		container,
		<BrowserRouter>
			<Provider store={store}>
				<App />
			</Provider>
		</BrowserRouter>
	)
}