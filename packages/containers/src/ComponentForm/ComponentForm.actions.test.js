import { setComponentFormDirtyState, COMPONENT_FORM_SET_DIRTY } from './ComponentForm.actions';

describe('ComponentForm.actions', () => {
	it('should return the action', () => {
		// given
		const componentId = 'myId';
		const dirty = true;
		// when
		const result = setComponentFormDirtyState(componentId, dirty);
		// then
		expect(result).toEqual({
			type: COMPONENT_FORM_SET_DIRTY,
			componentId,
			dirty,
		});
	});
});
