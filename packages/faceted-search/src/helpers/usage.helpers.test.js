import { getApplyDataFeature, getDataAttributesFrom } from './usage.helpers';

describe('helpers/usage', () => {
	it('should format an apply button data-feature based on formatedKey', () => {
		expect(getApplyDataFeature('name')).toEqual('filter.name.add');
		expect(getApplyDataFeature('Connection type')).toEqual('filter.connection_type.add');
		expect(getApplyDataFeature('UPPERCASE LABEL')).toEqual('filter.uppercase_label.add');
	});

	it('should get only data attributes from props', () => {
		const props = {
			key: 'a',
			id: 'b',
			other: 'c',
			'data-test': 'd',
			'data-feature': 'e',
		};
		expect(getDataAttributesFrom(props)).toEqual({
			'data-test': 'd',
			'data-feature': 'e',
		});
	});
});
