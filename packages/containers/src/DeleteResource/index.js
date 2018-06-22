import DeleteResource from './DeleteResource.connect';
import deleteResourceConstants from './constants';
import sagas from './sagas';
import actions from './actions';

DeleteResource.constants = deleteResourceConstants;
DeleteResource.sagas = sagas;
DeleteResource.actions = {
	'deleteResource:open': actions.open,
	'DeleteResource#validate': actions.validate,
	'DeleteResource#cancel': actions.cancel,
};

export default DeleteResource;
