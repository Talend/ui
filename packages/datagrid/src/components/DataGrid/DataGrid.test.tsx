import React from 'react';

import { render, screen } from '@testing-library/react';

import sample from '../../../mocks/sample.json';
import { getColumnDefs } from '../../serializers/datasetSerializer';
import DataGrid from './DataGrid';

describe('DataGrid', () => {
	it('should render a sample', async () => {
		render(<DataGrid columnDefs={getColumnDefs(sample)} rowData={sample.data} />);
		expect(
			await screen.findByText('Code postal', undefined, {
				timeout: 10000,
			}),
		).toBeInTheDocument();
	});
});
