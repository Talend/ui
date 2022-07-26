import sample from '../../mocks/sample.json';
import { getColumnDefs } from './datasetSerializer';

describe('getColumnDefs', () => {
	it('should returns the columns definitions', () => {
		const columnDefs = getColumnDefs(sample.schema);

		expect(columnDefs).toMatchSnapshot();
	});
});
