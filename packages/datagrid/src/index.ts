import * as components from './components';
import * as constants from './constants';
import { DatasetSerializer } from './serializers';

// New named exports
export * from './components';
export * from './constants';
export * from './constants/column-definition.constants';
export * from './types';
export * from './serializers';

// Legacy cmf module format
const module = Object.assign(components.DataGrid, {
	components: {
		...components,
		DatasetSerializer,
	},
	constants,
});

export default module;
