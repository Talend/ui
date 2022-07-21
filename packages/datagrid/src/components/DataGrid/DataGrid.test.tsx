import React from 'react';

// import all stories from the stories file
import { composeStories } from '@storybook/testing-react';
import { render, screen } from '@testing-library/react';

import sample from '../../../mocks/sample.json';
import { getColumnDefs } from '../../serializers/datasetSerializer';
import DataGrid from './DataGrid';
import * as stories from './Datagrid.stories';

jest.mock('ally.js');
const { Selection } = composeStories(stories);

describe('DataGrid', () => {
	it('should render a sample', async () => {
		render(<DataGrid columnDefs={getColumnDefs(sample)} rowData={sample.data} />);
		expect(
			await screen.findByText('Code postal', undefined, {
				timeout: 10000,
			}),
		).toBeInTheDocument();
	});
	it('should add class on selected columns', async () => {
		const wrapper = render(<Selection />);
		await Selection.play({ canvasElement: wrapper.baseElement });
	});
});
