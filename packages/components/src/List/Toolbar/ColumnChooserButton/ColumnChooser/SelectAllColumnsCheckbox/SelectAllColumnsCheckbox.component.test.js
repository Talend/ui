import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import getDefaultT from '../../../../../translate';
import Component from './SelectAllColumnsCheckbox.component';

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
	it('should call the onSelectAll when onChange is triggered on the column chooser table', () => {
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
		userEvent.click(screen.getByRole('checkbox'));

		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, false, 'Unselect all');
	});
});
