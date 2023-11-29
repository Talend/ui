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

	it('should trigger callback on toggle click (controlled)', async () => {
		const user = userEvent.setup();

		// given
		render(<SidePanel id="sp" {...props} onToggleDock={onToggleDock} docked />);

		// when
		await user.click(screen.getByLabelText('Expand menu'));

		// then
		expect(onToggleDock).toHaveBeenCalled();
		expect(screen.getByRole('navigation')).toHaveClass('docked');
	});

	it('should toggle panel (uncontrolled)', async () => {
		const user = userEvent.setup();

		// given

		// when
		render(<SidePanel id="sp" {...props} docked />);
		await user.click(screen.getByLabelText('Expand menu'));

		// then
		expect(screen.getByRole('navigation')).not.toHaveClass('docked');
	});
});
