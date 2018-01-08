import actions from './deleteResource.actions';
import deleteResourceConst from './deleteResource.constants';

describe('deleteResource actions', () => {
	describe('deleteResource:open', () => {
		it('should return an action DIALOG_BOX_DELETE_RESOURCE object', () => {
			// Given
			const context = {
				router: { getCurrentLocation: jest.fn(() => ({ pathname: 'currentUrl' })) },
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
				resourceInfo: data.model.resourceInfo,
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
