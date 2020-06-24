import { getApplyDataFeature } from './usage.helpers';

describe('helpers/usage', () => {
	it('should format an apply button data-feature based on formatedKey', () => {
		expect(getApplyDataFeature('name')).toEqual('filter.name.add');
		expect(getApplyDataFeature('Connection type')).toEqual('filter.connection_type.add');
		expect(getApplyDataFeature('UPPERCASE LABEL')).toEqual('filter.uppercase_label.add');
	});
});
