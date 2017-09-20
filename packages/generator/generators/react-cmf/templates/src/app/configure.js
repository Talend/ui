import { api } from '@talend/react-cmf';
import { Redirect, HomeListView } from '@talend/react-containers';
import redirect from './actions/redirect';
import { fetchDataSets } from './actions/dataset';
import { fetchDataStores } from './actions/datastore';

import App from './components/App.container';

const registerComponent = api.route.registerComponent;
const registerActionCreator = api.action.registerActionCreator;

export default {
	initialize() {
		/**
		 * Register components in CMF Components dictionary
		 */
		registerComponent('App', App);
		registerComponent('HomeListView', HomeListView);
		registerComponent('Redirect', Redirect);

		/**
		 * Register action creators in CMF Actions dictionary
		 */
		registerActionCreator('dataset:fetchAll', fetchDataSets);
		registerActionCreator('datastore:fetchAll', fetchDataStores);
		registerActionCreator('redirect', redirect);
	},
};
