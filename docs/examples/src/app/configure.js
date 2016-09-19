import { api } from 'react-cmf';

import App from './components/App.container';
import ExampleAlert from './components/ExampleAlert';
import ExampleBreadcrumb from './components/ExampleBreadcrumb';
import ExampleSideMenu from './components/ExampleSideMenu';

const registerComponent = api.route.registerComponent;

export default {
	initialize() {
		registerComponent('App', App);
		registerComponent('ExampleAlert', ExampleAlert);
		registerComponent('ExampleBreadcrumb', ExampleBreadcrumb);
		registerComponent('ExampleSideMenu', ExampleSideMenu);
	},
};
