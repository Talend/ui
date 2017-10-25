import DeleteResource from './DeleteResource.connect';
import deleteResourceConstants from './deleteResource.constants';
import deleteResourceSagas from './deleteResource.sagas';
import actions, { validate, cancel } from './deleteResource.actions';

DeleteResource.constants = deleteResourceConstants;
DeleteResource.sagas = deleteResourceSagas;
DeleteResource.actions = {
	'deleteResource:open': actions.open,
	'deleteResource:validate': validate,
	'deleteResource:cancel': cancel,
};

export default DeleteResource;
