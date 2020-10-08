import cmf from '@talend/react-cmf';
import cmfModule from './cmfModule';

// eslint-disable-next-line import/prefer-default-export
export function registerAllContainers() {
	cmf.component.registerMany(cmfModule.components);
}
