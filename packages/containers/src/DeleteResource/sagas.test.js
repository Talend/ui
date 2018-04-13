import SagaTester from 'redux-saga-tester';
import { Map, List } from 'immutable';

import deleteResourceConst from './constants';
import actions from './actions';
import deleteResource, { buildHttpDelete } from './sagas';

describe('buildHttpDelete', () => {
	it('should return an http object with delete method ', () => {
		// When
		const ret = buildHttpDelete(
			'/myEndpoint',
			'labelResource',
			deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
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
			deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
		);
		const retResponse = ret.onResponse();
		expect(retResponse).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
			model,
		});
	});
});

describe('deleteConfirmationSaga simple integration test', () => {
	const sagaTester = new SagaTester({
		initialState: {
			cmf: {
				collections: new Map({
					resourceType: new List([new Map({ id: 'id', label: 'label' })]),
				}),
			},
		},
	});

	it('should throw error if some params are not set', () => {
		let error = null;
		sagaTester.reset(true);
		// given
		try {
			sagaTester.start(deleteResource(), { id: 'id' });
		} catch (e) {
			error = e;
		}

		expect(error.message).toEqual('DeleteResource saga : uri not defined');
	});

	it('should return current location if delete is activated and canceled', () => {
		sagaTester.reset(true);
		// given
		sagaTester.start(
			deleteResource({
				uri: 'uri',
				resourceType: 'resourceType',
				redirectUrl: '/resourceType',
				routerParamsAttribute: 'id',
			}),
			{ id: 'id' },
		);
		const data = {
			model: {
				id: 'id',
			},
		};
		const redirectUrl = '/resourceType';
		const context = {
			router: {
				getCurrentLocation: jest.fn(() => ({ pathname: redirectUrl })),
			},
		};
		// when
		sagaTester.dispatch(actions.open(undefined, data, context));
		sagaTester.dispatch(actions.cancel());

		// then
		const expectedActions = sagaTester.getCalledActions();
		expect(expectedActions[1]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL,
		});
		expect(expectedActions[2]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: redirectUrl,
			},
		});
	});

	it('should return current location if delete is activated and validated, and http delete action should be issued', () => {
		sagaTester.reset(true);
		// given
		const uri = 'uri';
		const resourceType = 'resourceType';
		const id = 'id';
		const redirectUrl = '/resourceType';
		sagaTester.start(
			deleteResource({ uri, resourceType, redirectUrl, routerParamsAttribute: 'id' }),
			{ id },
		);
		const data = {
			model: {
				id,
			},
		};
		const context = {
			router: {
				getCurrentLocation: jest.fn(() => ({ pathname: redirectUrl })),
			},
		};
		// when
		sagaTester.dispatch(actions.open(undefined, data, context));
		sagaTester.dispatch(actions.validate());

		// then
		const expectedActions = sagaTester.getCalledActions();
		// Then
		expect(expectedActions[2]).toHaveProperty('type', 'DELETE');
		expect(expectedActions[2]).toHaveProperty('url', `${uri}/${resourceType}/${id}`);
		expect(expectedActions[3]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: redirectUrl,
			},
		});
	});
});

describe('deleteConfirmationSaga datastore', () => {
	const sagaTester = new SagaTester({ initialState: {} });
	beforeEach(() => {
		sagaTester.start(
			deleteResource({
				uri: 'uri',
				resourceType: 'resourceType',
				redirectUrl: '/connections',
				routerParamsAttribute: 'id',
			}),
			{ id: 'modelId' },
		);
		// Given
		sagaTester.dispatch({
			type: '@@router/LOCATION_CHANGE',
			payload: {
				method: 'replace',
				args: ['/connections/datastoreId/delete'],
			},
		});
	});
	it('sould have received @@router/LOCATION_CHANGE', () => {
		const expectedActions = sagaTester.getCalledActions();
		// Then
		expect(expectedActions[0]).toEqual({
			type: '@@router/LOCATION_CHANGE',
			payload: {
				method: 'replace',
				args: ['/connections/datastoreId/delete'],
			},
		});
	});
	it('should call deleteResourceCancel then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		// When
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL,
		});
		const expectedActions = sagaTester.getCalledActions();
		// Then
		expect(expectedActions[expectedActions.length - 1]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate with found = false, then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
			resourceInfo: {
				id: 'modelId',
				resourceType: 'datastore',
				label: 'modelLabel',
				uri: 'uriToCall',
				found: false,
			},
		});
		const expectedActions = sagaTester.getCalledActions();
		expect(expectedActions[expectedActions.length - 1]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate with modelId different from requestId then finally received DIALOG_BOX_DLETE_RESOURCE_CLOSE', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
			resourceInfo: {
				id: 'anotherId',
				resourceType: 'datastore',
				label: 'modelLabel',
				uri: 'uriToCall',
				found: true,
			},
		});
		const expectedActions = sagaTester.getCalledActions();
		expect(expectedActions[expectedActions.length - 1]).toEqual({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: '/connections',
			},
		});
	});
	it('sould call deleteResourceValidate then finally received DIALOG_BOX_DELETE_RESOURCE_SUCCESS', () => {
		sagaTester.reset(true);
		sagaTester.dispatch({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
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
