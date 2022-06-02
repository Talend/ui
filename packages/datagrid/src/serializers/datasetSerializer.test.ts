import sample from '../sample.json';
import { getColumnDefs } from './datasetSerializer';

describe('#getColumnDefs', () => {
	it('should returns the columns definitions', () => {
		const columnDefs = getColumnDefs(sample);

		expect(columnDefs).toMatchSnapshot();
	});
});
