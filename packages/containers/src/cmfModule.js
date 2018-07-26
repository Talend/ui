import { cmfConnect } from '@talend/react-cmf';
import omit from 'lodash/omit';
import * as components from '@talend/react-components';
import * as containers from './index';

const toOmit = [
	'actionAPI',
	'Breadcrumbs',
	'CircularProgress',
	'Drawer',
	'Icon',
	'IconsProvider',
	'Layout',
	'TooltipTrigger',
];

const componentsMap = omit(containers, toOmit);
const alreadyRegistered = Object.keys(componentsMap);
Object.keys(omit(components, alreadyRegistered)).forEach(key => {
	if (components[key]) {
		componentsMap[key] = cmfConnect({})(components[key]);
	}
});

export default {
	components: componentsMap,
};
