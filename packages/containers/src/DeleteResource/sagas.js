import get from 'lodash/get';
import isString from 'lodash/isString';
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

export function* redirect(url) {
	if (!isString(url)) {
		throw new Error('redirect url can not be empty');
	}
	yield put({
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
		cmf: {
			routerReplace: url,
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
 * @param {string} itemId
 * @param {Array<String>} [resourcePath]
 * @param {string} collectionId - collection which stores resources
 * @param {string} resourceUri - uri to delete resource on backend
 */
export function* deleteResourceValidate(
	uri,
	resourceType,
	itemId,
	resourcePath,
	collectionId,
	resourceUri,
) {
	const action = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const safeURI = get(action, 'data.model.uri', uri);
	const safeType = get(action, 'data.model.resourceType', resourceType);
	const safeId = get(action, 'data.model.id', itemId);
	const safePath = get(action, 'data.model.resourcePath', resourcePath);
	const resourceCollectionId = get(action, 'data.model.collectionId', collectionId);
	const resourceLocator = getResourceLocator(resourceCollectionId || safeType, safePath);

	let resource;

	if (get(action, 'data.model.resource')) {
		resource = get(action, 'data.model.resource');
	} else {
		resource = yield select(cmf.selectors.collections.findListItem, resourceLocator, safeId);
	}

	const safeResourceUri = get(
		action,
		'data.model.resourceUri',
		resourceUri || `${safeURI}/${safeType}/${safeId}`,
	);
	if (resource && safeResourceUri) {
		const result = yield call(cmf.sagas.http.delete, safeResourceUri);
		if (result.response.ok) {
			yield put({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
				model: {
					...get(action, 'data.model', {}),
					id: safeId,
					labelResource: resource.get('label') || resource.get('name', ''),
				},
			});
			yield call(redirect, get(action, 'data.model.redirectUrl'));
		} else {
			yield put({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_ERROR,
				error: result.data,
			});
		}
	}
}

export function* deleteResourceCancel() {
	const action = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
	const url = get(action, 'data.model.onCancelRedirectUrl', get(action, 'data.model.redirectUrl'));
	yield call(redirect, url);
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
 * @param {string} sagaParams.collectionId optional param to specify collection which stores
 * resources,if not provided, will use resourceType as collectionId
 * @param {string} sagaParams.resourceUri optionsal param, specify the uri to delete resource.
 * if not provided, will use ':uri/:resourceType/:resourceId'
 */
function getDeleteResourceSagaRouter({
	uri,
	resourceType,
	redirectUrl,
	resourcePath,
	routerParamsAttribute = 'id',
	collectionId,
	resourceUri,
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
		try {
			yield race({
				deleteConfirmationValidate: call(
					deleteResourceValidate,
					uri,
					resourceType,
					routerParams[routerParamsAttribute],
					resourcePath,
					collectionId,
					resourceUri,
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
