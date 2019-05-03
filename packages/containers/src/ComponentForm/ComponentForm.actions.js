export const COMPONENT_FORM_SET_DIRTY = 'COMPONENT_FORM_SET_DIRTY';

export function setComponentFormDirtyState(componentId, dirty) {
	return {
		componentId,
		dirty,
		type: COMPONENT_FORM_SET_DIRTY,
	};
}

export default { setComponentFormDirtyState };
