import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameFilter from './NameFilter.component';

describe('NameFilter', () => {
	it('should trigger onChange callback on change', () => {
		const onChange = jest.fn();
		const payload = {
			target: {
				value: 'titi',
			},
		};

		render(<NameFilter onChange={onChange} />);
		expect(onChange).not.toBeCalled();

		userEvent.click(screen.getByRole('textbox'));
		userEvent.keyboard('titi');
		// wrapper.find('DebounceInput').at(0).simulate('change', payload);

		expect(onChange).toBeCalledWith(payload);
	});
});
