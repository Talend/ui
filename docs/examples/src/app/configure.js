import { api } from 'react-cmf';

import App from './components/App.container';
import ExampleAlert from './components/ExampleAlert';
import ExampleBreadcrumb from './components/ExampleBreadcrumb';
import ExampleButton from './components/ExampleButton';
import ExampleButtonAction from './components/ExampleButtonAction';
import ExampleButtonDispatcher from './components/ExampleButtonDispatcher';
import ExampleButtonsDispatcher from './components/ExampleButtonsDispatcher';
import ExampleLinkAction from './components/ExampleLinkAction';
import ExampleLinkDispatcher from './components/ExampleLinkDispatcher';
import ExampleLinksDispatcher from './components/ExampleLinksDispatcher';
import ExampleSidePanel from './components/ExampleSidePanel';

const registerComponent = api.route.registerComponent;

export default {
	initialize() {
		registerComponent('App', App);
		registerComponent('ExampleAlert', ExampleAlert);
		registerComponent('ExampleBreadcrumb', ExampleBreadcrumb);
		registerComponent('ExampleButton', ExampleButton);
		registerComponent('ExampleButtonAction', ExampleButtonAction);
		registerComponent('ExampleButtonDispatcher', ExampleButtonDispatcher);
		registerComponent('ExampleButtonsDispatcher', ExampleButtonsDispatcher);
		registerComponent('ExampleLinkAction', ExampleLinkAction);
		registerComponent('ExampleLinkDispatcher', ExampleLinkDispatcher);
		registerComponent('ExampleLinksDispatcher', ExampleLinksDispatcher);
		registerComponent('ExampleSidePanel', ExampleSidePanel);
	},
};
