import React from 'react';
import { shallow } from 'enzyme';

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
		expect(wrapper.find('CellTitleSelector').props().className).toBe(
			'theme-main-title theme-tc-main-title-clickable tc-main-title-clickable',
		);
		expect(wrapper.find('Icon').props().className).toBe(
			'theme-icon theme-tc-main-title-icon-clickable tc-main-title-icon-clickable',
		);
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
		expect(wrapper.find('CellTitleSelector').props().className).toBe('theme-main-title');
		expect(wrapper.find('Icon').props().className).toBe('theme-icon');
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
