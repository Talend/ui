import { Map } from 'immutable';
import * as nodeTypeActions from './nodeType.actions';

describe('Check that nodeType action creators generate the right action objects', () => {
	it('setNodeTypes', () => {
		const nodeTypes = Map<string, Object>().set('anything', { something: true });
		expect(nodeTypeActions.setNodeTypes(nodeTypes)).toEqual({
			type: 'FLOWDESIGNER_NODETYPE_SET',
			nodeTypes,
		});
	});
});
