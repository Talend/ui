import omit from 'lodash/omit';
import { cmfConnect } from '@talend/react-cmf';
import * as allComponents from '@talend/react-components';
import * as containers from './containers';

const components = Object.keys(allComponents).reduce((acc, key) => {
	if (!acc[key] && typeof allComponents[key] === 'function') {
		const options = {};
		if (['ActionList', 'AppSwitcher', 'Layout', 'RichLayout', 'Dialog'].includes(key)) {
			options.withComponentRegistry = true;
		}
		if (!allComponents[key].displayName) {
			allComponents[key].displayName = key;
		}
		// eslint-disable-next-line no-param-reassign
		acc[key] = cmfConnect(options)(allComponents[key]);
	}
	return acc;
}, omit(containers, ['actionAPI']));

export default {
	id: 'containers',
	components,
};
