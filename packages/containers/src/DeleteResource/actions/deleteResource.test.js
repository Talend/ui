import { deleteResource, validate, cancel } from './deleteResource';
import {
	DIALOG_BOX_DELETE_RESOURCE,
	DIALOG_BOX_DELETE_RESOURCE_OK,
	DIALOG_BOX_DELETE_RESOURCE_CANCEL,
} from '../constants';

describe('deleteResource actions', () => {
	describe('deleteResource:open', () => {
		it('should return an action DIALOG_BOX_DELETE_RESOURCE object', () => {
			// Given
			const context = { router: { location: { pathname: 'currentUrl' } } };
			const model = { id: 'modelId' };
			const data = { model };
			// When
			const result = deleteResource({}, data, context);
			// Then
			expect(result).toEqual({
				type: DIALOG_BOX_DELETE_RESOURCE,
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
			const result = validate({}, data);
			// Then
			expect(result).toEqual({
				type: DIALOG_BOX_DELETE_RESOURCE_OK,
				resourceInfo: data.model.resourceInfo,
			});
		});
	});
	describe('cancel', () => {
		it('should return an action object', () => {
			// When
			const result = cancel();
			// Then
			expect(result).toEqual({ type: DIALOG_BOX_DELETE_RESOURCE_CANCEL });
		});
	});
});
