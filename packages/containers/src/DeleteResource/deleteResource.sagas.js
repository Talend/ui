import { take, put, race, call } from 'redux-saga/effects';
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
 * Waiting for confirmation event.
 * Call the requested uri.
 * Redirect the user.
 * @param {string} labelResource
 * @param {string} uri
 * @param {string} redirectUrl
 */
export function* deleteResourceValidate(requestId) {
	const { resourceInfo } = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK);
	const { id, found, resourceType, label, uri } = resourceInfo;
	if (found && requestId === id) {
		yield put(
			buildHttpDelete(
				`${uri}/${resourceType}/${id}`,
				label,
				deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
			),
		);
	}
}

/**
 * Saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 */
export default function* deleteResourceSaga() {
	const { redirectUrl, model } = yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE);
	const { id } = model;
	try {
		yield race({
			deleteConfirmationValidate: call(deleteResourceValidate, id),
			deleteConfirmationCancel: call(function* deleteResourceCancel() {
				yield take(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL);
			}),
		});
	} catch (error) {
		yield put(deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_ERROR);
	} finally {
		yield put({
			type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: redirectUrl,
			},
		});
	}
}
