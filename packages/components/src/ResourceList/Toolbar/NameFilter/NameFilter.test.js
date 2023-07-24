import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import NameFilter from './NameFilter.component';

describe('NameFilter', () => {
	it('should trigger onChange callback on change', () => {
		jest.useFakeTimers();
		const onChange = jest.fn();
		const payload = {
			target: {
				value: 'titi',
			},
		};

		render(<NameFilter label="label" onChange={onChange} />);
		expect(onChange).not.toBeCalled();

		userEvent.click(screen.getByRole('textbox'));
		userEvent.keyboard('titi');
		jest.runAllTimers();

		expect(onChange).toBeCalledWith(expect.anything(payload));
		jest.useRealTimers();
	});
});
