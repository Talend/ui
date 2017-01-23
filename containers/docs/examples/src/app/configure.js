import { api } from 'react-cmf';

import App from './components/App.container';
import ExampleAlert from '../../../../examples/ExampleAlert';
import ExampleBreadcrumb from '../../../../examples/ExampleBreadcrumb';
import ExampleButton from '../../../../examples/ExampleButton';
import ExampleButtonAction from '../../../../examples/ExampleButtonAction';
import ExampleButtonDispatcher from '../../../../examples/ExampleButtonDispatcher';
import ExampleButtonsDispatcher from '../../../../examples/ExampleButtonsDispatcher';
import ExampleLinkAction from '../../../../examples/ExampleLinkAction';
import ExampleLinkDispatcher from '../../../../examples/ExampleLinkDispatcher';
import ExampleLinksDispatcher from '../../../../examples/ExampleLinksDispatcher';
import ExampleSidePanel from '../../../../examples/ExampleSidePanel';

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
