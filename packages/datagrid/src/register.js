import api from '@talend/react-cmf';
import cmfModule from './cmfModule';

export default function registerAllComponents() {
	api.component.registerMany(cmfModule.components);
}
