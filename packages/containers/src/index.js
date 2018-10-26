import omit from 'lodash/omit';
import * as allComponents from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';
import * as containers from './containers';

const components = Object.keys(allComponents).reduce((acc, key) => {
	if (!acc[key] && typeof allComponents[key] === 'function') {
		// eslint-disable-next-line no-param-reassign
		acc[key] = cmfConnect({})(allComponents[key]);
	}
	return acc;
}, omit(containers, ['actionAPI']));

export * from './containers';
export { default as actionAPI } from './actionAPI';

// keep backward compat
export const Layout = cmfConnect({})(allComponents.Layout);
export const CircularProgress = cmfConnect({})(allComponents.CircularProgress);
export const Drawer = cmfConnect({})(allComponents.Drawer);
export const Icon = cmfConnect({})(allComponents.Icon);
export const IconsProvider = cmfConnect({})(allComponents.IconsProvider);
export const TooltipTrigger = cmfConnect({})(allComponents.TooltipTrigger);

// cmfModule
export default {
	id: 'containers',
	components,
};
