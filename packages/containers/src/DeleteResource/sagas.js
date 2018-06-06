import invariant from 'invariant';
import get from 'lodash/get';
import { take, put, race, call, select } from 'redux-saga/effects';
import cmf from '@talend/react-cmf';
import deleteResourceConst from './constants';

/**
 * from a resourceType and an optional resourcePath, return a resource locator
 * if resourcePath is provided resourceType is prepend to resourcePath
 * @param {String} resourceType
 * @param {Array<String>} [resourcePath]
 * @return {String || Array<String>}
 */
export function getResourceLocator(resourceType, resourcePath) {
	if (resourcePath) {
		if (Array.isArray(resourcePath)) {
			return [resourceType, ...resourcePath];
		}
		throw Error(
			`Optional parameter resourcePath must be an array of string,
got ${resourcePath}`,
		);
	}
	return resourceType;
}

export function* redirect(action) {
	const url = get(action, 'data.redirectUrl');
	if (!url) {
		throw new Error('redirect action must have data.redirectUrl value');
	}
	yield put({
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
		cmf: {
			routerReplace: action.data.redirectUrl,
		},
	});
}

/**
 * Waiting for confirmation event.
 * Resolve the resource to delete.
 * Call the requested uri.
 * Redirect the user.
 * @param {string} uri
 * @param {string} resourceType
 * @param {string} id
 * @param {Array<String>} [resourcePath]
 */
export function* deleteResourceValidate(uri, resourceType, itemId, resourcePath) {
	const action = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const safeURI = get(action, 'data.model.uri', uri);
	const safeType = get(action, 'data.model.resourceType', resourceType);
	const safeId = get(action, 'data.model.id', itemId);
	const safePath = get(action, 'data.model.resourcePath', resourcePath);
	const resourceLocator = getResourceLocator(safeType, safePath);
	const resource = yield select(cmf.selectors.collections.findListItem, resourceLocator, safeId);
	if (resource && safeURI && safeType && safeId) {
		const { response } = yield call(cmf.sagas.http.delete, `${safeURI}/${safeType}/${safeId}`);
		if (response.ok) {
			yield put({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
				model: { labelResource: resource.get('label', '') },
			});
		}
		yield call(redirect, action);
	}
}

export function* deleteResourceCancel() {
	const action = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
	yield call(redirect, action);
}

/**
 * For Backward compatibility
 * Return a saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 * To be used with the sagaRouter
 * @param {object} sagaParams the params to setup the saga
 * @param {string} sagaParams.uri the uri of the endpoint to make the calls
 * @param {string} sagaParams.resourceType the resource type to call delete endpoint ( at least )
 * @param {string} sagaParams.redirectUrl url to redirect after delete action is done or cancel
 * @param {Array<String>} sagaParams.resourcePath optional
 * @param {string} sagaParams.routerParamsAttribute optional param in route to get the resource id
 */
function getDeleteResourceSagaRouter({
	uri,
	resourceType,
	redirectUrl,
	resourcePath,
	routerParamsAttribute = 'id',
} = {}) {
	// eslint-disable-next-line no-console
	console.warn(`DEPRECATED: please move the following sagaRouter config as props of DeleteResource container:
	{
		uri: ${uri},
		resourceType: ${resourceType},
		redirectUrl: ${redirectUrl},
		resourcePath: ${resourcePath},
	}`);
	return function* deleteResourceSaga(routerParams) {
		invariant(!!uri, 'DeleteResource saga : uri not defined');
		invariant(!!resourceType, 'DeleteResource saga : resourceType not defined');
		invariant(!!redirectUrl, 'DeleteResource saga : redirectUrl not defined');

		try {
			yield race({
				deleteConfirmationValidate: call(
					deleteResourceValidate,
					uri,
					resourceType,
					routerParams[routerParamsAttribute],
					resourcePath,
				),
				deleteConfirmationCancel: call(deleteResourceCancel),
			});
		} catch (error) {
			throw new Error(`DeleteResource failed :${error}`);
		}
	};
}

function* handle() {
	try {
		yield race({
			deleteConfirmationValidate: call(deleteResourceValidate),
			deleteConfirmationCancel: call(deleteResourceCancel),
		});
	} catch (error) {
		throw new Error(`DeleteResource failed: ${error}`);
	}
}

// Backward compatibility
getDeleteResourceSagaRouter['DeleteResource#handle'] = handle;
export default getDeleteResourceSagaRouter;
