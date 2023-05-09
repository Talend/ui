/* eslint-disable react/display-name */
import { screen, render } from '@testing-library/react';
import { ItemsComponent } from './Items.component';

jest.mock(
	'react-virtualized/dist/commonjs/AutoSizer/AutoSizer',
	() => props => <div id="autoSizer">{props.children({ height: 30, width: 30 })}</div>, // eslint-disable-line react/prop-types
);

describe('Items', () => {
	const props = {
		items: [
			{ label: 'Lorem ipsum dolor sit amet 0' },
			{ label: 'Lorem ipsum dolor sit amet 1', checked: true },
			{ label: 'Lorem ipsum dolor sit amet 2' },
		],
		dataTest: 'item',
		getItemHeight: () => 42,
	};

	const propsNested = {
		items: [
			{ label: 'Lorem ipsum dolor default' },
			{ label: 'Lorem ipsum dolor Parent', checked: true, children: props.items },
		],
		dataTest: 'item',
		getItemHeight: () => 42,
	};

	it('should render', () => {
		// when
		const { container } = render(<ItemsComponent {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render with provided id', () => {
		// when
		render(<ItemsComponent {...props} id="my-widget" />);

		// then
		expect(screen.getByTestId('item-0')).toHaveAttribute('id', 'my-widget-1-item');
	});

	it('should render without toggleAll checkbox', () => {
		// when
		render(<ItemsComponent {...props} showToggleAll={false} />);

		// then
		expect(screen.queryByText('Select all')).not.toBeInTheDocument();
	});

	it('should render with nested items', () => {
		// when
		render(<ItemsComponent {...propsNested} />);

		// then
		expect(screen.getByText('Lorem ipsum dolor default')).toBeInTheDocument();
		expect(screen.getByText('Lorem ipsum dolor Parent')).toBeInTheDocument();
	});
});
