import * as nodeTypeActions from './nodeType.actions';

describe('Check that nodeType action creators generate the right action objects', () => {
	it('setNodeTypes', () => {
		const nodeTypes = { anything: { something: true } };
		expect(nodeTypeActions.setNodeTypes(nodeTypes)).toEqual({
			type: 'FLOWDESIGNER_NODETYPE_SET',
			nodeTypes,
		});
	});
});
