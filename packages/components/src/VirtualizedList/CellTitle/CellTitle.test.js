import React from 'react';
import { shallow } from 'enzyme';

import CellTitle from './CellTitle.component';

describe('CellTitle', () => {
	it('should render title selector component', () => {
		// given
		const columnData = {
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
				rowData={rowData}
				rowIndex={1}
			/>
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('icon', () => {
		const rowData = {
			id: 1,
			title: 'my awesome title',
			icon: 'talend-file-o',
		};

		it('should render the icon', () => {
			// given
			const columnData = {
				id: 'my-title',
				iconKey: 'icon',
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={'my awesome title'}
					columnData={columnData}
					rowData={rowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

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
					rowData={rowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
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
					rowData={noIconRowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
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
					rowData={rowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
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
					rowData={rowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
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
					rowData={noActionsRowData}
					rowIndex={1}
				/>
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});
	});
});
