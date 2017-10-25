import SagaTester from 'redux-saga-tester';
import {
	DIALOG_BOX_DELETE_RESOURCE,
	DIALOG_BOX_DELETE_RESOURCE_OK,
	DIALOG_BOX_DELETE_RESOURCE_CANCEL,
	DIALOG_BOX_DELETE_RESOURCE_CLOSE,
	DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
} from '../constants';
import deleteResourceSaga, { buildHttpDelete } from './deleteResource';

describe('buildHttpDelete', () => {
	it('should return an http object with delete method ', () => {
		// When
		const ret = buildHttpDelete(
			'/myEndpoint',
			'labelResource',
			DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
		);
		// Then
		expect(ret.type).toEqual('DELETE');
		expect(ret.url).toEqual('/myEndpoint');
	});
	it('should return a onResponse function', () => {
		// Given
		const model = { labelResource: 'labelResource' };
		// When
		const ret = buildHttpDelete(
			'/myEndpoint',
			'labelResource',
			DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
		);
		const retResponse = ret.onResponse();
		expect(retResponse).toEqual({ type: DIALOG_BOX_DELETE_RESOURCE_SUCCESS, model });
	});
});

describe('deleteConfirmationSaga datastore', () => {
	const sagaTester = new SagaTester({ initialState: {} });
	beforeEach(() => {
		sagaTester.start(deleteResourceSaga);
		// Given
		sagaTester.dispatch({
			type: '@@router/LOCATION_CHANGE',
			payload: {
				method: 'replace',
				args: ['/connections/datastoreId/delete'],
			},
		});
		sagaTester.dispatch({
			type: DIALOG_BOX_DELETE_RESOURCE,
			model: { id: 'modelId' },
			redirectUrl: '/connections',
		});
	});
	it('sould have received @@router/LOCATION_CHANGE', () => {
		const actions = sagaTester.getCalledActions();
		// Then
		expect(actions[0]).toEqual({
			type: '@@router/LOCATION_CHANGE',
			payload: {
				method: 'replace',
				args: ['/connections/datastoreId/delete'],
			},
		});
	});
	it('should have received DIALOG_BOX_DELETE_CONFIRMATION', () => {
		const actions = sagaTester.getCalledActions();
		// Then
		expect(actions[1]).toEqual({
			type: DIALOG_BOX_DELETE_RESOURCE,
			model: { id: 'modelId' },
			redirectUrl: '/connections',
		});
	});
	it('should call deleteResourceCancel then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		// When
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: DIALOG_BOX_DELETE_RESOURCE_CANCEL,
		});
		const actions = sagaTester.getCalledActions();
		// Then
		expect(actions[actions.length - 1]).toEqual({
			type: DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate with found = false, then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: DIALOG_BOX_DELETE_RESOURCE_OK,
			resourceInfo: {
				id: 'modelId',
				resourceType: 'datastore',
				label: 'modelLabel',
				uri: 'uriToCall',
				found: false,
			},
		});
		const actions = sagaTester.getCalledActions();
		expect(actions[actions.length - 1]).toEqual({
			type: DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate with modelId different from requestId then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: DIALOG_BOX_DELETE_RESOURCE_OK,
			resourceInfo: {
				id: 'anotherId',
				resourceType: 'datastore',
				label: 'modelLabel',
				uri: 'uriToCall',
				found: true,
			},
		});
		const actions = sagaTester.getCalledActions();
		expect(actions[actions.length - 1]).toEqual({
			type: DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate then finally received DIALOG_BOX_DELETE_RESOURCE_SUCCESS', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: DIALOG_BOX_DELETE_RESOURCE_OK,
			resourceInfo: {
				id: 'modelId',
				resourceType: 'datastore',
				label: 'modelLabel',
				uri: 'uriToCall',
				found: true,
			},
		});
	});
});
