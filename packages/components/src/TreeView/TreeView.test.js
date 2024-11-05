// rewrite tests using react-testing-library
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import TreeView from './TreeView.component';

const defaultProps = {
	id: 'id',
	structure: [
		{
			name: 'grandpa',
			actions: [
				{
					action: () => 'itemRemoveCallback',
					icon: 'talend-trash',
					label: 'remove element',
				},
			],
			children: [
				{
					name: 'mami',
					toggled: true,
					children: [{ name: 'me', selected: true }, { name: 'bro' }],
				},
				{ name: 'aunt', toggled: false, children: [{ name: 'cousin' }] },
			],
			toggled: true,
			counter: 101,
			showCounter: true,
		},
	],
	headerText: 'some elements',
	addAction: jest.fn(),
	addActionLabel: 'add element',
	onSelect: jest.fn(),
	onToggle: jest.fn(),
	onToggleAllSiblings: jest.fn(),
};

describe('TreeView', () => {
	it('should be wrapped by tree gesture HOC', () => {
		expect(TreeView.displayName).toBe('TreeGesture(TreeView)');
	});

	it('should render', () => {
		// when
		const { container } = render(<TreeView {...defaultProps} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('when a user click on the add Action it should call props.addAction', async () => {
		const user = userEvent.setup();

		// given
		const props = {
			...defaultProps,
			addAction: jest.fn(),
		};
		render(<TreeView {...props} />);
		expect(props.addAction).not.toHaveBeenCalled();

		// when
		await user.click(screen.getByLabelText('add element'));

		// then
		expect(props.addAction).toHaveBeenCalled();
	});
});
