import { api, cmfConnect } from '@talend/react-cmf';
import omit from 'lodash/omit';
import * as bootstrap from 'react-bootstrap';
import * as components from '@talend/react-components';
import * as containers from './index';
import wrap from './wrap';

export function registerAllContainers() {
	const mycontainers = omit(containers, ['actionAPI']);
	const toOmit = Object.keys(mycontainers);
	const connected = {};
	// connect our component which provide a great api
	Object.keys(omit(components, toOmit)).forEach(key => {
		if (components[key]) {
			connected[key] = cmfConnect({})(components[key]);
		}
	});
	// connect bootstrap component adding the inject API
	Object.keys(bootstrap).forEach(key => {
		if (!connected[key]) {
			connected[key] = wrap(bootstrap[key], key);
		}
	});
	api.component.registerMany(mycontainers);
	api.component.registerMany(connected);
}
