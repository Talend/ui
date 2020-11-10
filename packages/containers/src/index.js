import { cmfConnect } from '@talend/react-cmf';
import * as allComponents from '@talend/react-components';
import cmfModule from './cmfModule';

export * from './containers';
export { default as actionAPI } from './actionAPI';
export * from './register';

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

export default cmfModule;
