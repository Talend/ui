/**
 * This is a CMF plugin that let you configure your store
 * "redux-storage": "^4.1.2",
 * "redux-storage-decorator-filter": "^1.1.8",
 * "redux-storage-decorator-immutablejs": "^1.0.4",
 * "redux-storage-engine-localstorage": "^1.1.4",
 */

import * as reduxLocalStorage from './reduxLocalStorage';

export default {
	localStorage: reduxLocalStorage,
};
