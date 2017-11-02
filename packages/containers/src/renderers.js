import { api } from '@talend/react-cmf';
import Action from './Action';
import ActionBar from './ActionBar';
import ActionButton from './ActionButton';
import ActionFile from './ActionFile';
import ActionDropdown from './ActionDropdown';
import Actions from './Actions';
import ActionSplitDropdown from './ActionSplitDropdown';

const renderers = {
	Action,
	ActionBar,
	ActionButton,
	ActionFile,
	ActionDropdown,
	Actions,
	ActionSplitDropdown,
};

export default function getRenderers() {
	Object.keys(renderers).forEach((key) => {
		if (api.component.has(key)) {
			const component = api.component.get(key);
			if (component && renderers[key] && renderers[key] !== component) {
				renderers[key] = component;
			}
		}
	});
	return renderers;
}
