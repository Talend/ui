import * as nodeTypeActions from './nodeType.actions';

describe('Check that nodeType action creators generate the right action objects', () => {
	it('setNodeTypes', () => {
		expect(nodeTypeActions.setNodeTypes('anything'))
			.toEqual({
				type: 'FLOWDESIGNER_NODETYPE_SET',
				nodeTypes: 'anything',
			});
	});
});
