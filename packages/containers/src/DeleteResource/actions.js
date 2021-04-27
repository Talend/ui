import deleteResourceConst from './constants';

/**
 * Action called at the dialog opening|mounting.
 * @param {object} event
 * @param {object} data
 */
function open(event, data) {
	const { model } = data;
	const pathname = window.location.pathname;
	return {
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE,
		cmf: {
			routerReplace: `${pathname}/${model.id}/delete`,
		},
		model,
		redirectUrl: pathname,
	};
}

/**
 * Action to delete a resource and close the confirm dialog.
 */
function validate(event, data) {
	return {
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
		data,
	};
}

/**
 * Action to cancel and close the confirm dialog.
 */
function cancel(event, data) {
	return {
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL,
		data,
	};
}

export default {
	open,
	validate,
	cancel,
};
