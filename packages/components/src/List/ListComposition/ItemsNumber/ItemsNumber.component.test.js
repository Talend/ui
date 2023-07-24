import { screen, render } from '@testing-library/react';
import { ListContext } from '../context';

import getDefaultT from '../../../translate';
import ItemsNumber from './ItemsNumber.component';

describe('ItemsNumber', () => {
	const props = {
		id: 'list-items-number',
		totalItems: 42,
	};

	const defaultContext = {
		t: getDefaultT(),
	};

	describe('ItemsNumber', () => {
		it('should render total number of items', () => {
			// when
			render(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...props} />
				</ListContext.Provider>,
			);

			// then
			expect(screen.getByText(`${props.totalItems} item`)).toBeVisible();
		});
		it('should render customized label', () => {
			// given
			const newProps = {
				...props,
				label: `${props.totalItems} bananas`,
			};

			// when
			render(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...newProps} />
				</ListContext.Provider>,
			);

			// then
			expect(screen.getByText(newProps.label)).toBeVisible();
		});
		it('should render labelSelected if props.selected', () => {
			// given
			const newProps = {
				...props,
				selected: 11,
				label: `${props.totalItems} bananas`,
				labelSelected: `11/${props.totalItems} bananas`,
			};

			// when
			render(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...newProps} />
				</ListContext.Provider>,
			);

			// then
			expect(screen.getByText(newProps.labelSelected)).toBeVisible();
		});

		it('should render total number of items + number of selected items with default label', () => {
			// given
			const newProps = {
				...props,
				selected: 11,
			};

			// when
			render(
				<ListContext.Provider value={defaultContext}>
					<ItemsNumber {...newProps} />
				</ListContext.Provider>,
			);

			// then
			expect(screen.getByText(`${newProps.selected}/${newProps.totalItems} item`)).toBeVisible();
		});
	});
});
