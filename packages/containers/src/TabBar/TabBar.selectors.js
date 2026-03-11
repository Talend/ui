import cmf from '@talend/react-cmf';
import TabBar from '@talend/react-components/lib/TabBar';
import { DEFAULT_STATE } from './TabBar.connect';

/**
 * Selector on the state from the tabbar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getComponentState(state, idComponent) {
	return (
		cmf.selectors.components.getComponentState(state, TabBar.displayName, idComponent) ??
		DEFAULT_STATE
	);
}

/**
 * Return the selectedKey attr from the state of tabbar id given.
 * @param {object} state
 * @param {string} idComponent
 */
export function getSelectedKey(state, idComponent) {
	const compState = getComponentState(state, idComponent);
	if (compState == null) return undefined;
	if (typeof compState.get === 'function') {
		return compState.get('selectedKey', undefined);
	}
	return compState.selectedKey;
}
