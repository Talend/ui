import { take, put, race, call } from 'redux-saga/effects';
import { actions } from '@talend/react-cmf';
import {
	DIALOG_BOX_DELETE_RESOURCE,
	DIALOG_BOX_DELETE_RESOURCE_OK,
	DIALOG_BOX_DELETE_RESOURCE_CANCEL,
	DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
	DIALOG_BOX_DELETE_RESOURCE_CLOSE,
} from '../constants';

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
	const { resourceInfo } = yield take(DIALOG_BOX_DELETE_RESOURCE_OK);
	const { id, found, resourceType, label, uri } = resourceInfo;
	if (found && requestId === id) {
		const http = buildHttpDelete(
			`${uri}/${resourceType}/${id}`,
			label,
			DIALOG_BOX_DELETE_RESOURCE_SUCCESS,
		);
		yield put(http);
	}
}

/**
 * Saga for delete resource confirmation dialog box.
 * Race between cancel and confirm deleting the resource.
 */
export default function* deleteResourceSaga() {
	const data = yield take(DIALOG_BOX_DELETE_RESOURCE);
	const { redirectUrl } = data;
	const { id } = data.model;
	try {
		yield race({
			deleteConfirmationValidate: call(deleteResourceValidate, id),
			deleteConfirmationCancel: call(function* deleteResourceCancel() {
				yield take(DIALOG_BOX_DELETE_RESOURCE_CANCEL);
			}),
		});
	} catch (error) {
		console.error(error);
	} finally {
		yield put({
			type: DIALOG_BOX_DELETE_RESOURCE_CLOSE,
			cmf: {
				routerReplace: redirectUrl,
			},
		});
	}
}
