import { api } from '@talend/react-cmf';
import Action from './Action';
import ActionBar from './ActionBar';
import ActionButton from './ActionButton';
import ActionDropdown from './ActionDropdown';
import Actions from './Actions';
import ActionSplitDropdown from './ActionSplitDropdown';

const renderers = {
	Action,
	ActionBar,
	ActionButton,
	ActionDropdown,
	Actions,
	ActionSplitDropdown,
};

export default function getRenderers() {
	Object.keys(renderers).forEach((key) => {
		try {
			const component = api.component.get(key);
			if (component && renderers[key] && renderers[key] !== component) {
				renderers[key] = component;
			}
		} catch (error) {
			/* empty catch because this just means this component
			has not been registred */
		}
	});
	return renderers;
}
