import React from 'react';
import ReactDOM from 'react-dom';

import { composeStories } from '@storybook/testing-react';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { Grid as agGrid } from 'ag-grid-community';
import { AgGridReact, AgGridColumn } from 'ag-grid-react';

import sample from '../../../mocks/sample.json';
import { HIGHLIGHTED_CELL_CLASS_NAME } from '../../constants';
import { getColumnDefs } from '../../serializers/datasetSerializer';
import DataGrid from './DataGrid';
import * as stories from './Datagrid.stories';

declare global {
	interface Window {
		React?: typeof React;
		ReactDOM?: typeof ReactDOM;
		agGrid?: typeof agGrid;
		AgGridReact?: { AgGridReact: typeof AgGridReact; AgGridColumn: typeof AgGridColumn };
	}
}

jest.mock('ally.js');
const { Selection } = composeStories(stories);

jest.mock('ally.js');

describe('DataGrid', () => {
	beforeAll(() => {
		window.React = React;
		window.ReactDOM = ReactDOM;
		window.agGrid = agGrid;
		window.AgGridReact = { AgGridReact, AgGridColumn };
	});
	afterAll(() => {
		delete window.React;
		delete window.ReactDOM;
		delete window.agGrid;
		delete window.AgGridReact;
	});
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
	it('should highlight cell with the same values', async () => {
		render(<DataGrid columnDefs={getColumnDefs(sample)} rowData={sample.data} />);
		await screen.findByText('Segmentation', undefined, {
			timeout: 10000,
		});
		await userEvent.click(screen.getAllByText('c')[0]);
		await waitFor(() => {
			expect(screen.getAllByText('c')[1].closest('.ag-cell')).toHaveClass(
				HIGHLIGHTED_CELL_CLASS_NAME,
			);
		});
	});
});
