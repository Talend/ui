import cmf from '@talend/react-cmf';
import cmfModule from './cmfModule';

// eslint-disable-next-line import/prefer-default-export
export function registerAllContainers() {
	console.warn(
		'@talend/react-containers > registerAllContainers() is deprecated. Use the cmf module instead to register the components. This function may be removed in 7.0',
	);
	cmf.component.registerMany(cmfModule.components);
}
