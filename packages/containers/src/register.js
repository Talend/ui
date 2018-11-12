import cmf from '@talend/react-cmf';
import containersCMFModule from './index';

// eslint-disable-next-line import/prefer-default-export
export function registerAllContainers() {
	cmf.component.registerMany(containersCMFModule.components);
}
