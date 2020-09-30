import omit from 'lodash/omit';
import * as allComponents from '@talend/react-components';
import { cmfConnect } from '@talend/react-cmf';
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

export * from './containers';
export { default as actionAPI } from './actionAPI';

export const Layout = cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
})(allComponents.Layout);
export const CircularProgress = cmfConnect({
	omitCMFProps: true,
})(allComponents.CircularProgress);
export const Drawer = cmfConnect({
	omitCMFProps: true,
	withComponentRegistry: true,
})(allComponents.Drawer);
export const Icon = cmfConnect({
	omitCMFProps: true,
})(allComponents.Icon);
export const IconsProvider = cmfConnect({
	omitCMFProps: true,
})(allComponents.IconsProvider);
export const TooltipTrigger = cmfConnect({
	omitCMFProps: true,
})(allComponents.TooltipTrigger);

// cmfModule
export default {
	id: 'containers',
	components,
};
