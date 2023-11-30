import { act, render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import getDefaultT from '../../../translate';
import { ListContext } from '../context';
import ColumnChooser from './ColumnChooser.component';

jest.unmock('@talend/design-system');

describe('ColumnChooser', () => {
	let defaultContext;

	beforeEach(() => {
		defaultContext = {
			columns: [
				{ dataKey: 'foo', label: 'Foo' },
				{ dataKey: 'bar', label: 'Bar' },
			],
			setVisibleColumns: jest.fn(),
			t: getDefaultT(),
		};
	});

	it('should render column chooser component', () => {
		// when
		render(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);

		// then
		expect(screen.getByRole('button')).toBeVisible();
		act(() => screen.getByRole('button').focus()); // trigger the tooltip
		expect(screen.getByText('Open the column chooser')).toBeVisible();
	});

	it('should update columns', async () => {
		const user = userEvent.setup();

		// given
		render(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);

		// when
		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText('Bar'));
		await user.click(screen.getByText('Apply'));

		// then
		expect(defaultContext.setVisibleColumns).toHaveBeenCalledWith(['bar']);
	});

	it('should call props.onSubmit if exist', async () => {
		const user = userEvent.setup();

		const onSubmit = jest.fn();
		render(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" onSubmit={onSubmit} />
			</ListContext.Provider>,
		);
		await user.click(screen.getByRole('button'));
		await user.click(screen.getByText('Bar'));
		await user.click(screen.getByText('Apply'));

		expect(onSubmit).toHaveBeenCalled();
	});
});
