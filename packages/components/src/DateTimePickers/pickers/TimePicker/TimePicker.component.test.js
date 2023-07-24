import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { TimePicker } from './TimePicker.component';

describe('TimePicker component', () => {
	it('should render', () => {
		const { container } = render(<TimePicker onChange={jest.fn()} onKeyDown={jest.fn()} />);

		expect(container.firstChild).toMatchSnapshot();
	});
	describe('event handlers', () => {
		it('should call onChange when select time', () => {
			// given
			const onChange = jest.fn();
			const event = expect.anything();
			render(<TimePicker onChange={onChange} onKeyDown={jest.fn()} />);
			// when
			userEvent.click(screen.getByText('03:00'));
			// then
			expect(onChange).toBeCalledWith(event, {
				textInput: '03:00',
				time: { hours: '03', minutes: '00', seconds: '00' },
			});
		});
		it('should hightlight item matches user input', () => {
			// when
			const scrollIntoViewMock = jest.fn();
			window.HTMLElement.prototype.scrollIntoView = scrollIntoViewMock;
			render(<TimePicker onChange={jest.fn()} onKeyDown={jest.fn()} textInput="12:00" />);
			// then
			expect(scrollIntoViewMock).toBeCalledWith({ block: 'center' });
			expect(screen.getByText('12:00')).toHaveClass('highlight');
		});
	});
});
