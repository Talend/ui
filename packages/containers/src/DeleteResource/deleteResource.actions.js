import deleteResourceConst from './deleteResource.constants';

/**
 * Action called at the dialog opening|mounting.
 * @param {object} event
 * @param {object} data
 */
function deleteResource(event, data, context) {
	const { model } = data;
	const { pathname } = context.router ? context.router.getCurrentLocation() : { pathname: '/' };
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
function validate() {
	return {
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_OK,
	};
}

/**
 * Action to cancel and close the confirm dialog.
 */
function cancel() {
	return {
		type: deleteResourceConst.DIALOG_BOX_DELETE_RESOURCE_CANCEL,
	};
}

export default {
	open: deleteResource,
	validate,
	cancel,
};
