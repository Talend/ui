import invariant from 'invariant';
import { take, put, race, call, select } from 'redux-saga/effects';
import { api, actions } from '@talend/react-cmf';
import deleteResourceConst from './deleteResource.constants';

/**
 * Wil be deprecated with the new http saga api.
 * Call the requested uri in delete mode.
 * Add a label param for the notification.
 * @param {string} uri
 * @param {string} labelResource
 * @param {string} responseType
 */
export function buildHttpDelete(uri, labelResource, responseType) {
	return actions.http.delete(uri, {
		onResponse() {
			return {
				type: responseType,
				model: { labelResource },
			};
		},
	});
}

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
			`Optional parameter resourcePath should be an array of string,
got ${resourcePath}`,
		);
	}
	return resourceType;
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
	yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const resourceLocator = getResourceLocator(resourceType, resourcePath);
	const resource = yield select(api.selectors.collections.findListItem, resourceLocator, itemId);
	if (resource) {
		yield put(
			buildHttpDelete(
				`${uri}/${resourceType}/${itemId}`,
				resource.get('label', ''),
				deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
			),
		);
	}
}

/**
 * Return a saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 * @param {object} sagaParams the params to setup the saga
 * @param {string} sagaParams.uri the uri of the endpoint to make the calls
 * @param {string} sagaParams.resourceType the resource type to call delete endpoint ( at least )
 * @param {string} sagaParams.redirectUrl url to redirect after delete action is done or cancel
 * @param {Array<String>} sagaParams.resourcePath optional
 * @param {string} sagaParams.routerParamsAttribute optional param in route to get the resource id
 */
export default function deleteResource({
	uri,
	resourceType,
	redirectUrl,
	resourcePath,
	routerParamsAttribute = 'id',
} = {}) {
	invariant(!!uri, 'DeleteResource saga : uri not defined');
	invariant(!!resourceType, 'DeleteResource saga : resourceType not defined');
	invariant(!!redirectUrl, 'DeleteResource saga : redirectUrl not defined');

	return function* deleteResourceSaga(routerParams) {
		try {
			yield race({
				deleteConfirmationValidate: call(
					deleteResourceValidate,
					uri,
					resourceType,
					routerParams[routerParamsAttribute],
					resourcePath,
				),
				deleteConfirmationCancel: call(function* deleteResourceCancel() {
					yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
				}),
			});
		} catch (error) {
			invariant(process.env.NODE_ENV !== 'production', `DeleteResource race failed :${error}`);
		} finally {
			yield put({
				type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
				cmf: {
					routerReplace: redirectUrl,
				},
			});
		}
	};
}
