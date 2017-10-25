import {
	DIALOG_BOX_DELETE_RESOURCE,
	DIALOG_BOX_DELETE_RESOURCE_OK,
	DIALOG_BOX_DELETE_RESOURCE_CANCEL,
} from '../constants';

/**
 * Action called at the dialog opening|mounting.
 * @param {object} event
 * @param {object} data
 */
export function deleteResource(event, data, context) {
	const { model } = data;
	const path = context.router ? context.router.location.pathname : '/';
	return {
		type: DIALOG_BOX_DELETE_RESOURCE,
		cmf: {
			routerReplace: `${path}/${model.id}/delete`,
		},
		model,
		redirectUrl: path,
	};
}

/**
 * Action to delete a resource and close the confirm dialog.
 */
export function validate(event, data) {
	return {
		type: DIALOG_BOX_DELETE_RESOURCE_OK,
		resourceInfo: data.model.resourceInfo,
	};
}

/**
 * Action to cancel and close the confirm dialog.
 */
export function cancel() {
	return {
		type: DIALOG_BOX_DELETE_RESOURCE_CANCEL,
	};
}

export default {
	open: deleteResource,
	validate,
	cancel,
};
