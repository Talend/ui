import { configureGetFilteredItems } from './selector';

const localConfig = {
	items: [
		{
			id: 'id1',
			value: 'value1',
			text: 'text',
		},
		{
			id: 'id2',
			value: 'value2',
			text: 'text',
		},
	],
	columns: [
		{ key: 'id', name: 'ID' },
		{ key: 'value', name: 'Value' },
	],
};

describe('List Selector tests', () => {
	it('should dispatch a redirect action', () => {
		configureGetFilteredItems(localConfig);
	});
});
