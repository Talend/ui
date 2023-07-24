import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ColumnChooser from './ColumnChooser.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

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
		screen.getByRole('button').focus(); // trigger the tooltip
		expect(screen.getByText('Open the column chooser')).toBeVisible();
	});

	it('should update columns', () => {
		// given
		render(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" />
			</ListContext.Provider>,
		);

		// when
		userEvent.click(screen.getByRole('button'));
		userEvent.click(screen.getByText('Bar'));
		userEvent.click(screen.getByText('Apply'));

		// then
		expect(defaultContext.setVisibleColumns).toBeCalledWith(['bar']);
	});

	it('should call props.onSubmit if exist', () => {
		const onSubmit = jest.fn();
		render(
			<ListContext.Provider value={defaultContext}>
				<ColumnChooser id="myColumnChooser" onSubmit={onSubmit} />
			</ListContext.Provider>,
		);
		userEvent.click(screen.getByRole('button'));
		userEvent.click(screen.getByText('Bar'));
		userEvent.click(screen.getByText('Apply'));

		expect(onSubmit).toHaveBeenCalled();
	});
});
