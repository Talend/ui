import { getApplyDataFeature } from './pendo.helpers';

describe('helpers/pendo', () => {
	it('should format an apply button data-feature based on label', () => {
		expect(getApplyDataFeature('name')).toEqual('filter.name.add');
		expect(getApplyDataFeature('Connection type')).toEqual('filter.connection_type.add');
		expect(getApplyDataFeature('UPPERCASE LABEL')).toEqual('filter.uppercase_label.add');
	});
});
