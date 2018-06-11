import redirect from './redirect';
import { fetchDataSets } from './dataset';
import { fetchDataStores } from './datastore';

export default {
	'dataset:fetchAll': fetchDataSets,
	'datastore:fetchAll': fetchDataStores,
	redirect,
};
