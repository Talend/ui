import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../../../translate';
import { ColumnChooserProvider } from '../columnChooser.context';
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
		const { container } = render(
			<ColumnChooserProvider value={contextValues}>
				<Component />
			</ColumnChooserProvider>,
		);
		// Then
		expect(
			// eslint-disable-next-line testing-library/no-container
			container.querySelectorAll('.tc-column-chooser-row.theme-tc-column-chooser-row'),
		).toHaveLength(columns.length + 1);
		expect(container.firstChild).toMatchSnapshot();
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
		const user = userEvent.setup();

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
		await user.click(screen.getByText('col3').previousSibling);

		// then
		expect(onChangeVisibility).toHaveBeenNthCalledWith(1, false, 'col3');
	});
});
