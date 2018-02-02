import { cmfConnect } from '@talend/react-cmf';

import Container, { DEFAULT_STATE } from './datagrid.container';

export default cmfConnect({
	defaultState: DEFAULT_STATE,
	componentId: ownProps => ownProps.id || 'DataGrid',
})(Container);
