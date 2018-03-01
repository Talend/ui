import { api, cmfConnect } from '@talend/react-cmf';
import omit from 'lodash/omit';
import * as bootstrap from 'react-bootstrap';
import * as components from '@talend/react-components';
import * as containers from './index';
import wrap from './wrap';

export function registerAllContainers() {
	const onlyReactComponent = omit(containers, ['actionAPI']);
	api.component.registerMany(onlyReactComponent);

	const alreadyRegistered = Object.keys(onlyReactComponent);

	Object.keys(omit(components, alreadyRegistered)).forEach(key => {
		if (components[key]) {
			api.component.register(key, cmfConnect({})(components[key]));
		} else {
			console.warn('no component at ', key);
		}
	});

	Object.keys(bootstrap).forEach(key => {
		if (!api.component.has(key)) {
			api.component.register(key, wrap(bootstrap[key], key));
		}
	});
}
