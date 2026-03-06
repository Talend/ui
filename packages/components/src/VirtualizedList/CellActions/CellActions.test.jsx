import { screen, render } from '@testing-library/react';
import CellActions from './CellActions.component';

const actions = [
	{
		id: 'action-1',
		label: 'Simple action',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: 'action-2',
		displayMode: 'dropdown',
		label: 'Dropdown action',
		icon: 'talend-file-o',
		items: [
			{
				label: 'Document 1',
				onClick: jest.fn(),
			},
			{
				label: 'Document 2',
				onClick: jest.fn(),
			},
		],
	},
	{
		id: 'action-3',
		displayMode: 'splitDropdown',
		label: 'Split dropdown action',
		onClick: jest.fn(),
		items: [
			{
				label: 'File 1',
				onClick: jest.fn(),
			},
			{
				label: 'File 2',
				onClick: jest.fn(),
			},
		],
	},
];

describe('CellActions', () => {
	it('should render actions', () => {
		// when
		const { container } = render(<CellActions cellData={actions} />);

		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(screen.getAllByRole('button')).toHaveLength(3);
		expect(screen.getByLabelText('Simple action')).toBeVisible();
		expect(screen.getByLabelText('Dropdown action')).toBeVisible();
		expect(screen.getByLabelText('Split dropdown action')).toBeVisible();
		expect(screen.getAllByRole('menuitem')).toHaveLength(4);
		expect(screen.getAllByRole('menuitem')).toHaveLength(4);
		expect(screen.getAllByRole('menuitem')[0]).toHaveTextContent('Document 1');
		expect(screen.getAllByRole('menuitem')[1]).toHaveTextContent('Document 2');
		expect(screen.getAllByRole('menuitem')[2]).toHaveTextContent('File 1');
		expect(screen.getAllByRole('menuitem')[3]).toHaveTextContent('File 2');
	});
});
