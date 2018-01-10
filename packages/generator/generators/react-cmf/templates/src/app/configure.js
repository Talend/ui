import { api } from '@talend/react-cmf';
import { registerAllContainers } from '@talend/react-containers/lib/register';
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
		registerAllContainers();
		registerComponent('App', App);

		/**
		 * Register action creators in CMF Actions dictionary
		 */
		registerActionCreator('dataset:fetchAll', fetchDataSets);
		registerActionCreator('datastore:fetchAll', fetchDataStores);
		registerActionCreator('redirect', redirect);
	},
};
