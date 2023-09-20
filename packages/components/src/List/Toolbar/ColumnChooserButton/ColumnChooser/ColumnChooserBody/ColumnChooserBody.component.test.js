import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { ColumnChooserProvider } from '../columnChooser.context';
import getDefaultT from '../../../../../translate';

import Component from './ColumnChooserBody.component';

jest.unmock('@talend/design-system');

const columns = [
	{ visible: true, label: 'col1', locked: true, order: 1 },
	{ visible: true, label: 'col2', locked: true, order: 2 },
	{ visible: true, label: 'col3', order: 3 },
	{ visible: false, label: 'col4', order: 4 },
	{ visible: true, label: 'col5', order: 5 },
	{ visible: false, label: 'col6', order: 6 },
];

describe('ColumnChooserBody', () => {
	it('should render the columns rows and the column select all', () => {
		// Given
		const contextValues = {
			columns,
			id: 'body-context-id',
			onChangeVisibility: jest.fn(),
			onSelectAll: jest.fn(),
			selectAll: true,
			t: getDefaultT(),
		};
		// When
		render(
			<ColumnChooserProvider value={contextValues}>
				<Component />
			</ColumnChooserProvider>,
		);
		// Then select all is available and checked
		const selectAll = screen.getByLabelText(/select all/i);
		expect(selectAll).toBeChecked();

		// Then items are listed
		expect(
			screen.queryByRole('checkbox', {
				name: 'col1',
			}),
		).not.toBeInTheDocument();
		expect(
			screen.queryByRole('checkbox', {
				name: 'col2',
			}),
		).not.toBeInTheDocument();
		expect(document.querySelectorAll('use[xlink:href="#locker-closed:M"]')).toHaveLength(2);

		expect(
			screen.getByRole('checkbox', {
				name: 'col3',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'col4',
			}),
		).not.toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'col5',
			}),
		).toBeChecked();
		expect(
			screen.getByRole('checkbox', {
				name: 'col6',
			}),
		).not.toBeChecked();
	});
	it('should render with children', () => {
		// Given
		const contextValues = {
			columns,
		};
		const Children = <div data-testid="my-child">Hello</div>;
		// When
		render(
			<ColumnChooserProvider value={contextValues}>
				<Component>{Children}</Component>
			</ColumnChooserProvider>,
		);
		// Then
		expect(screen.getByTestId('my-child')).toBeVisible();
	});
	it('should call the onChangeVisibility when onChange is triggered on the column chooser table', async () => {
		const onChangeVisibility = jest.fn();
		// Given
		const contextValues = {
			columns,
			id: 'body-context-id',
			onChangeVisibility,
			onSelectAll: jest.fn(),
			selectAll: true,
			t: getDefaultT(),
		};
		// When
		render(
			<ColumnChooserProvider value={contextValues}>
				<Component />
			</ColumnChooserProvider>,
		);
		expect(screen.getByText('col3').previousSibling).toBeChecked();
		userEvent.click(screen.getByText('col3').previousSibling);

		// then
		expect(onChangeVisibility).toHaveBeenNthCalledWith(1, false, 'col3');
	});
});
