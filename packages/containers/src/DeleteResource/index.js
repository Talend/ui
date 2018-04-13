import DeleteResource from './DeleteResource.connect';
import deleteResourceConstants from './constants';
import sagas from './sagas';
import actions from './actions';

DeleteResource.constants = deleteResourceConstants;
DeleteResource.sagas = sagas;
DeleteResource.actions = {
	'deleteResource:open': actions.open,
	'deleteResource:validate': actions.validate,
	'deleteResource:cancel': actions.cancel,
};

export default DeleteResource;
