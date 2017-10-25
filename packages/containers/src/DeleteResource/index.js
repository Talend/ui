import DeleteResource from './DeleteResource.connect';
import deleteResourceConstants from './deleteResource.constants';
import deleteResourceSagas from './deleteResource.sagas';
import deleteResourceActions from './deleteResource.actions';

DeleteResource.constants = deleteResourceConstants;
DeleteResource.sagas = deleteResourceSagas;
DeleteResource.actions = deleteResourceActions;
// DeleteResource.connect = DeleteResource;

console.log('DeleteResource UI', DeleteResource);

export default DeleteResource;
