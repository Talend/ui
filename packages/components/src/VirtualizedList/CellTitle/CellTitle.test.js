/* eslint-disable mdx/no-unused-expressions */
/* eslint-disable @typescript-eslint/no-unused-expressions */
/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { screen, render } from '@testing-library/react';
import CellTitle from './CellTitle.component';
import { BrowserRouter, Link as RouterLink } from 'react-router-dom';

jest.unmock('@talend/design-system');
jest.mock('../../TooltipTrigger', () => props => (
	<div data-testid="TooltipTrigger" aria-label={props.label}>
		{props.children}
	</div>
));
describe('CellTitle', () => {
	it('should render', () => {
		// given
		const columnData = {
			iconKey: 'icon',
			id: 'my-title',
			displayModeKey: 'displayMode',
			onClick: jest.fn(),
			onEditCancel: jest.fn(),
			onEditSubmit: jest.fn(),
		};
		const rowData = {
			id: 1,
			displayMode: 'text',
			icon: 'talend-file-o',
			title: 'my awesome title',
		};

		// when
		const { container } = render(
			<CellTitle
				cellData="my awesome title"
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should use column data as function', () => {
		// given
		const columnData = item => ({
			id: 'my-title',
			'data-feature': `list.click.${item.id}`,
			onClick: jest.fn(),
		});
		const rowData = {
			id: 1,
			displayMode: 'text',
			icon: 'talend-file-o',
			title: 'my awesome title',
		};

		// when
		render(
			<CellTitle
				cellData="my awesome title"
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(screen.getByRole('link')).toHaveAttribute('data-feature', 'list.click.1');
	});

	it('should render without button if no onClick on the title', () => {
		// given
		const columnData = {
			iconKey: 'icon',
			id: 'my-title',
			displayModeKey: 'displayMode',
			onEditCancel: jest.fn(),
			onEditSubmit: jest.fn(),
		};
		const rowData = {
			id: 1,
			displayMode: 'text',
			icon: 'talend-file-o',
			title: 'my awesome title',
		};

		// when
		render(
			<CellTitle
				cellData="my awesome title"
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(screen.queryByRole('link')).not.toBeInTheDocument();
		expect(screen.getByText('my awesome title')).toBeVisible();
	});

	it('should render a link if linkAs props is provided', () => {
		// given
		const columnData = {
			id: 'my-title',
			linkAs: <RouterLink to="/documentation"></RouterLink>,
		};
		const rowData = {
			id: 1,
			displayMode: 'text',
			title: 'my awesome title',
		};

		// when
		render(
			<BrowserRouter>
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>
			</BrowserRouter>,
		);

		// then
		expect(screen.getByRole('link', { name: 'my awesome title' })).toHaveAttribute(
			'href',
			'/documentation',
		);
	});

	describe('icon', () => {
		const rowData = {
			id: 1,
			title: 'my awesome title',
			icon: 'talend-file-o',
		};

		it('should NOT render the icon when no iconKey is provided', () => {
			// given
			const columnData = {
				id: 'my-title',
				iconKey: undefined, // no icon key
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.getByText('my awesome title')).toBeVisible();
			expect(document.querySelector('.tc-icon')).not.toBeInTheDocument();
		});

		it('should NOT render the icon when the rowData has no icon value', () => {
			// given
			const columnData = {
				id: 'my-title',
				iconKey: 'icon',
			};
			const noIconRowData = {
				...rowData,
				icon: undefined, // no icon name value
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={noIconRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.getByText('my awesome title')).toBeVisible();
			expect(document.querySelector('.tc-icon')).not.toBeInTheDocument();
		});

		it('should render icon with tooltip when iconLabelKey is provided and the rowData has tooltip label value', () => {
			const columnData = {
				id: 'my-title',
				iconKey: 'icon',
				iconLabelKey: 'iconTooltipLabel',
			};
			const withTooltipLableRowData = {
				...rowData,
				iconTooltipLabel: 'My tooltip label', // no icon name value
			};
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={withTooltipLableRowData}
					rowIndex={1}
				/>,
			);
			expect(screen.getByText('my awesome title')).toBeVisible();
			expect(document.querySelector('.tc-icon')).toBeInTheDocument();
			expect(screen.getAllByTestId('TooltipTrigger')[0]).toHaveAttribute(
				'aria-label',
				'My tooltip label',
			);
		});
	});

	describe('actions', () => {
		const rowData = {
			id: 1,
			title: 'my awesome title',
			actions: [
				{
					label: 'edit',
					icon: 'talend-pencil',
					onClick: jest.fn('onEdit'),
				},
				{
					label: 'delete',
					icon: 'talend-trash',
					onClick: jest.fn('onDelete'),
				},
			],
		};
		function getComponent() {
			return ({ label, onClick }) => {
				return <button onClick={onClick}>{label}</button>;
			};
		}

		it('should render the actions', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: 'actions',
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={getComponent}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.getAllByRole('button')).toHaveLength(2);
			expect(screen.getAllByRole('button')[0]).toHaveTextContent('edit');
			expect(screen.getAllByRole('button')[1]).toHaveTextContent('delete');
		});

		it('should NOT render the actions when no actions key is provided', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: undefined, // no actions key
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={getComponent}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});

		it('should NOT render the actions when cell is disabled', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: undefined, // no actions key
				disabledKey: 'nop',
				nop: true,
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={getComponent}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});

		it('should NOT render the actions when rowData has no actions', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: 'actions',
			};
			const noActionsRowData = {
				...rowData,
				actions: undefined, // not actions
			};

			// when
			render(
				<CellTitle
					cellData="my awesome title"
					columnData={columnData}
					getComponent={getComponent}
					rowData={noActionsRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
	});
});
