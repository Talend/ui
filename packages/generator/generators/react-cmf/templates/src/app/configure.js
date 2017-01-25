import { api, configureStore, settings } from 'react-cmf';

import App from './components/App.container';
import rootReducer from './reducers';

const registerComponent = api.route.registerComponent;
// const registerActionCreator =  api.registry.registerActionCreator;

export default {
	initialize() {
		registerComponent('App', App);
	},
};
