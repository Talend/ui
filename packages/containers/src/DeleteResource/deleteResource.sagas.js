import invariant from 'invariant';
import { take, put, race, call, select } from 'redux-saga/effects';
import { actions } from '@talend/react-cmf';
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
 * for a resourceType and an id find and return the resource
 * @param {object} state
 * @param {String} resourceType
 * @param {String} id
 */
export function findResource(state, resourceType, id) {
	const collection = state.cmf.collections.get(resourceType);
	if (collection) {
		return collection.find(element => element.get('id') === id);
	}
	return undefined;
}

/**
 * Waiting for confirmation event.
 * Call the requested uri.
 * Redirect the user.
 * @param {string} labelResource
 * @param {string} uri
 * @param {string} redirectUrl
 */
export function* deleteResourceValidate(uri, resourceType, id) {
	yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const resource = yield select(findResource, resourceType, id);
	let resourceinfo = { label: '', found: false };
	if (resource) {
		resourceinfo = { label: resource.get('label'), found: true };
	}

	if (resourceinfo.found) {
		yield put(
			buildHttpDelete(
				`${uri}/${resourceType}/${id}`,
				resourceinfo.label,
				deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
			),
		);
	}
}

/**
 * Return a saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 */
export default function deleteResource(uri, resourceType) {
	return function* deleteResourceSaga() {
		const { redirectUrl, model } = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE);
		const { id } = model;
		try {
			yield race({
				deleteConfirmationValidate: call(deleteResourceValidate, uri, resourceType, id),
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
