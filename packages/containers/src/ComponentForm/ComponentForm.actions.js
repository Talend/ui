export const COMPONENT_FORM_SET_DIRTY = 'COMPONENT_FORM_SET_DIRTY';

/**
 * This action will change for a given componentForm name his dirty status
 * @param {string} componentId the component form id
 * @param {boolean} dirty the dirty state to apply
 */
export function setComponentFormDirtyState(componentId, dirty) {
	if (typeof dirty !== 'boolean') {
		throw new Error(
			`ComponentForm dirty state should be a boolean, received "${dirty}"(${typeof dirty}) instead`,
		);
	}

	return {
		componentId,
		dirty,
		type: COMPONENT_FORM_SET_DIRTY,
	};
}

export default { setComponentFormDirtyState, COMPONENT_FORM_SET_DIRTY };
