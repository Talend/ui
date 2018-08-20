import { store } from '@talend/react-cmf/lib/mock';
import { fromJS } from 'immutable';
import { mapStateToProps } from './List.connect';

const localConfig = {
	collectionId: 'default',
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
	list: {
		columns: [{ key: 'id', name: 'ID' }, { key: 'value', name: 'Value' }],
	},
};

const state = store.state();
state.cmf.collections = fromJS({
	default: {
		columns: [{ key: 'id', name: 'ID' }, { key: 'value', name: 'Value' }],
		items: localConfig.items,
	},
});

describe('List Selector tests', () => {
	it('should return items in a page when pagination applied', () => {
		state.cmf.components = fromJS({
			'Container(List)': {
				default: {
					itemsPerPage: 2,
					startIndex: 1,
				},
			},
		});
		const props = mapStateToProps(state, { ...localConfig, toolbar: { pagination: {} } });
		expect(props.items.toJS().length).toBe(2);
	});
});
