import { cmfConnect } from '@talend/react-cmf';
import omit from 'lodash/omit';
import * as allComponents from '@talend/react-components';
import * as containers from './index';

const components = Object.keys(allComponents).reduce((acc, key) => {
	if (!acc[key] && typeof allComponents[key] === 'function') {
		// eslint-disable-next-line no-param-reassign
		acc[key] = cmfConnect({})(allComponents[key]);
	}
	return acc;
}, omit(containers, ['actionAPI']));

export default {
	components,
};
