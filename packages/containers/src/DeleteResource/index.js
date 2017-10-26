import DeleteResource from './DeleteResource.connect';
import deleteResourceConstants from './deleteResource.constants';
import deleteResourceSagas from './deleteResource.sagas';
import actions from './deleteResource.actions';

DeleteResource.constants = deleteResourceConstants;
DeleteResource.sagas = deleteResourceSagas;
DeleteResource.actions = {
	'deleteResource:open': actions.open,
	'deleteResource:validate': actions.validate,
	'deleteResource:cancel': actions.cancel,
};

export default DeleteResource;
