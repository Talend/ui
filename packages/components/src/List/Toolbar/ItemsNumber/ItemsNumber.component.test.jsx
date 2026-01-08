import { screen, render } from '@testing-library/react';
import ItemsNumber from './ItemsNumber.component';

const props = {
	id: 'list-items-number',
	totalItems: 42,
};
describe('ItemsNumber', () => {
	it('should render total number of items', () => {
		// when
		render(<ItemsNumber {...props} />);

		// then
		expect(screen.getByText(`${props.totalItems} item`)).toBeVisible();
	});
	it('should render total number of items + customized title', () => {
		// given
		const newProps = {
			...props,
			label: `${props.totalItems} bananas`,
		};

		// when
		render(<ItemsNumber {...newProps} />);

		// then
		expect(screen.getByText(`${newProps.totalItems} bananas`)).toBeVisible();
	});
	it('should render total number of items + number of selected items with default label', () => {
		// given
		const newProps = {
			...props,
			selected: 11,
		};

		// when
		render(<ItemsNumber {...newProps} />);

		// then
		expect(screen.getByText(`${newProps.selected}/${newProps.totalItems} item`)).toBeVisible();
	});

	it('should render total number of items + number of selected items with customized label', () => {
		// given
		const newProps = {
			...props,
			selected: 11,
			label: '42 bananas',
			labelSelected: '11/42 bananas',
		};

		// when
		render(<ItemsNumber {...newProps} />);

		// then
		expect(screen.getByText(`${newProps.selected}/${newProps.totalItems} bananas`)).toBeVisible();
	});
});
