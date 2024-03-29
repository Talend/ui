import { screen, render } from '@testing-library/react';
import getDefaultT from '../../../../../translate';
import Component from './ColumnChooserHeader.component';
import { ColumnChooserProvider } from '../columnChooser.context';

const columns = [
	{ visible: true, label: 'col1', locked: true, order: 1 },
	{ visible: true, label: 'col2', locked: true, order: 2 },
	{ visible: true, label: 'col3', order: 3 },
	{ visible: true, label: 'col4', order: 4 },
	{ visible: true, label: 'col5', order: 5 },
	{ visible: false, label: 'col6', order: 6 },
];

describe('ColumnChooserHeader', () => {
	it('should render by default', () => {
		// Given
		const id = 'col-chooser-id';
		// When
		const { container } = render(
			<ColumnChooserProvider
				value={{
					id,
					columns,
					t: getDefaultT(),
				}}
			>
				<Component />
			</ColumnChooserProvider>,
		);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render the children', () => {
		// Given
		const Children = () => <div data-testid="my-child">Hello world</div>;
		// When
		render(
			<Component>
				<Children />
			</Component>,
		);
		// Then
		expect(screen.getByTestId('my-child')).toBeVisible();
	});
});
