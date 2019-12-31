import omit from 'lodash/omit';
import * as allComponents from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';
import * as containers from './containers';

const components = Object.keys(allComponents).reduce((acc, key) => {
	if (!acc[key] && typeof allComponents[key] === 'function') {
		const options = {};
		if (['ActionList', 'Layout', 'RichLayout', 'Dialog'].includes(key)) {
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

export * from './containers';
export { default as actionAPI } from './actionAPI';

// cmfModule
export default {
	id: 'containers',
	components,
};
