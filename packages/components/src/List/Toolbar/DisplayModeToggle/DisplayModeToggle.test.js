import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import DisplayModeToggle from './DisplayModeToggle.component';

jest.unmock('@talend/design-system');
const props = {
	onChange: jest.fn(),
};
describe('DisplayModeToggle', () => {
	it('should render', () => {
		// when
		const { container } = render(<DisplayModeToggle {...props} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render table mode selected', () => {
		// given
		render(<DisplayModeToggle {...props} mode="table" />);

		// when
		const btn = screen.getAllByRole('button')[0];
		// then
		expect(btn).toHaveAttribute('aria-pressed', 'true');
		expect(btn.querySelector('svg')).toHaveAttribute('name', 'talend-table');
	});
	it('should call onChange when change display mode', () => {
		// given
		render(<DisplayModeToggle {...props} mode="table" />);

		// when
		const btn = screen.getAllByRole('button')[1];
		userEvent.click(btn);

		// then
		expect(props.onChange).toHaveBeenCalledWith(expect.anything(), 'large');
	});
});
