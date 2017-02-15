import { api, configureStore, settings } from 'react-cmf';
import { Redirect, HomeListView } from 'react-talend-containers';

import App from './components/App.container';
import rootReducer from './reducers';

const registerComponent = api.route.registerComponent;
// const registerActionCreator =  api.registry.registerActionCreator;
registerComponent('App', App);
registerComponent('Redirect', Redirect);
registerComponent('HomeListView', HomeListView);

export default {
	initialize() {
	},
};
