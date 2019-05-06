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

	it('should throw if dirty is not a boolean', () => {
		// given
		const componentId = 'myId';
		const dirty = "i'm a cat";
		let result;

		// when
		try {
			result = setComponentFormDirtyState(componentId, dirty);
		} catch (error) {
			expect(error.message).toEqual(
				'ComponentForm dirty state should be a boolean, received "i\'m a cat"(string) instead',
			);
		}
		expect(result).toBeUndefined();
	});
});
