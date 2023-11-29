import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDefaultT from '../../../../../translate';
import Component from './SelectAllColumnsCheckbox.component';

jest.unmock('@talend/design-system');

describe('SelectAllColumnsCheckbox', () => {
	it('should render by default', () => {
		// given
		const props = {
			id: 'select-all-id',
			onChange: jest.fn(),
			t: getDefaultT(),
		};
		// when
		const { container } = render(<Component {...props} />);
		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should call the onSelectAll when onChange is triggered by a checked checkbox', async () => {
		const user = userEvent.setup();

		// Given
		const onChange = jest.fn();
		const props = {
			id: 'select-all-id',
			onChange,
			value: true,
			t: getDefaultT(),
		};

		// When
		render(<Component {...props} />);
		await user.click(screen.getByRole('checkbox'));

		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, false, 'Unselect all');
	});

	it('should call the onSelectAll when onChange is triggered by an indeterminate checkbox', async () => {
		const user = userEvent.setup();

		// Given
		const onChange = jest.fn();
		const props = {
			id: 'select-all-id',
			onChange,
			value: undefined,
			indeterminate: true,
			t: getDefaultT(),
		};

		// When
		render(<Component {...props} />);
		await user.click(screen.getByRole('checkbox'));

		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, true, 'Select all');
	});
});
