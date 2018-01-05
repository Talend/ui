import invariant from 'invariant';
import { take, put, race, call, select } from 'redux-saga/effects';
import { actions } from '@talend/react-cmf';
import { findCollectionPathListItem } from '@talend/react-cmf/lib/selectors';
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
 * from a resourceType and an optionnal resourcePath, return a resource locator
 * if resourcePath is provided resourceType is prepend to resourcePath
 * @param {String} resourceType
 * @param {Array<String>} resourcePath - optionnal
 * @return {String || Array<String>}
 */
export function getResourceLocator(resourceType, resourcePath) {
	if (resourcePath) {
		if (Array.isArray(resourcePath)) {
			return [resourceType, ...resourcePath];
		}
		throw Error(
			`Optional parameter resourcePath should be an arrray of string,
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
 * @param {Array<String>} resourcePath- optional
 */
export function* deleteResourceValidate(uri, resourceType, itemId, resourcePath) {
	yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const resourceLocator = getResourceLocator(resourceType, resourcePath);
	const resource = yield select(findCollectionPathListItem, resourceLocator, itemId);
	let resourceinfo = { label: '', found: false };
	if (resource) {
		resourceinfo = { label: resource.get('label'), found: true };
	}
	if (resourceinfo.found) {
		yield put(
			buildHttpDelete(
				`${uri}/${resourceType}/${itemId}`,
				resourceinfo.label,
				deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
			),
		);
	}
}

/**
 * Return a saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 * @param {string} uri
 * @param {string} resourceType
 * @param {Array<String>} resourcePath- optional
 */
export default function deleteResource(uri, resourceType, resourcePath) {
	return function* deleteResourceSaga() {
		const { redirectUrl, model } = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE);
		const { id } = model;
		try {
			yield race({
				deleteConfirmationValidate: call(
					deleteResourceValidate,
					uri,
					resourceType,
					id,
					resourcePath,
				),
				deleteConfirmationCancel: call(function* deleteResourceCancel() {
					yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
				}),
			});
		} catch (error) {
			invariant(true, `DeleteResource race failed :${error}`);
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
