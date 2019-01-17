import actions from './actions';
import deleteResourceConst from './constants';

describe('deleteResource actions', () => {
	describe('deleteResource:open', () => {
		it('should return an action DIALOG_BOX_DELETE_RESOURCE object', () => {
			// Given
			const context = {
				store: {
					getState: jest.fn(() => ({
						routing: { locationBeforeTransitions: { pathname: 'currentUrl' } },
					})),
				},
			};
			const model = { id: 'modelId' };
			const data = { model };
			// When
			const result = actions.open({}, data, context);
			// Then
			expect(result).toEqual({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE,
				cmf: {
					routerReplace: 'currentUrl/modelId/delete',
				},
				model,
				redirectUrl: 'currentUrl',
			});
		});
	});
	describe('validate', () => {
		it('should return an action object', () => {
			// Given
			const data = { model: { resourceInfo: { id: 'modelId' } } };
			// When
			const result = actions.validate({}, data);
			// Then
			expect(result).toEqual({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
				data,
			});
		});
	});
	describe('cancel', () => {
		it('should return an action object', () => {
			// When
			const result = actions.cancel();
			// Then
			expect(result).toEqual({ type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL });
		});
	});
});
