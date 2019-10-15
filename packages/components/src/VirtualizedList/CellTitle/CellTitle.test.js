import React from 'react';
import { shallow, mount } from 'enzyme';

import CellTitle from './CellTitle.component';

describe('CellTitle', () => {
	it('should render title selector component', () => {
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
		const wrapper = shallow(
			<CellTitle
				cellData={'my awesome title'}
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
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
		const wrapper = mount(
			<CellTitle
				cellData={'my awesome title'}
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(
			wrapper
				.find('button')
				.at(0)
				.prop('data-feature'),
		).toBe('list.click.1');
	});

	it('should render without active class if no onClick on the title', () => {
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
		const wrapper = shallow(
			<CellTitle
				cellData={'my awesome title'}
				columnData={columnData}
				getComponent={jest.fn()}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(wrapper.props().className).toBe('theme-tc-list-title tc-list-title');
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
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
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
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={noIconRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
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
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={withTooltipLableRowData}
					rowIndex={1}
				/>,
			);
			expect(wrapper.getElement()).toMatchSnapshot();
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

		it('should render the actions', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: 'actions',
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should NOT render the actions when no actions key is provided', () => {
			// given
			const columnData = {
				id: 'my-title',
				actionsKey: undefined, // no actions key
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
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
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
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
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					getComponent={jest.fn()}
					rowData={noActionsRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
