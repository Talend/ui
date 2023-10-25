import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import SidePanel from './SidePanel.component';

const onClick = jest.fn();
const onToggleDock = jest.fn();
const props = {
	actions: [
		{ label: 'Preparations', icon: 'fa fa-asterisk', onClick },
		{ label: 'Datasets', icon: 'fa fa-file-excel-o', onClick },
		{ label: 'Favorites', icon: 'fa fa-star', onClick },
	],
};

describe('SidePanel', () => {
	beforeEach(() => {
		jest.resetAllMocks();
	});

	it('should render', () => {
		const { container } = render(<SidePanel id="sp" {...props} />);
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getByRole('navigation')).toHaveClass('tc-side-panel');
		expect(screen.getByRole('list')).toBeVisible();
		expect(screen.getAllByRole('presentation')).toHaveLength(3);
	});

	it('should trigger callback on toggle click (controlled)', () => {
		// given
		render(<SidePanel id="sp" {...props} onToggleDock={onToggleDock} docked />);

		// when
		userEvent.click(screen.getByLabelText('Expand menu'));

		// then
		expect(onToggleDock).toBeCalled();
		expect(screen.getByRole('navigation')).toHaveClass('docked');
	});

	it('should toggle panel (uncontrolled)', () => {
		// given

		// when
		render(<SidePanel id="sp" {...props} docked />);
		userEvent.click(screen.getByLabelText('Expand menu'));

		// then
		expect(screen.getByRole('navigation')).not.toHaveClass('docked');
	});
});
