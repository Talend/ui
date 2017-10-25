import React from 'react';
import { shallow } from 'enzyme';
import faker from 'faker';

import CellTitle from './CellTitle.component';

faker.seed(42);
describe('CellTitle', () => {
	it('should render title selector component', () => {
		// given
		const columnData = {
			id: faker.random.word(),
			displayModeKey: 'displayMode',
			onClick: jest.fn(),
			onEditCancel: jest.fn(),
			onEditSubmit: jest.fn(),
		};
		const rowData = {
			id: 1,
			displayMode: 'text',
			icon: 'talend-file-o',
			title: faker.random.words(),
		};

		// when
		const wrapper = shallow(
			<CellTitle
				cellData={faker.random.words()}
				columnData={columnData}
				rowData={rowData}
				rowIndex={1}
			/>,
		);

		// then
		expect(wrapper.node).toMatchSnapshot();
	});

	describe('icon', () => {
		const rowData = {
			id: 1,
			title: faker.random.words(),
			icon: 'talend-file-o',
		};

		it('should render the icon', () => {
			// given
			const columnData = {
				id: faker.random.word(),
				iconKey: 'icon',
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

		it('should NOT render the icon when no iconKey is provided', () => {
			// given
			const columnData = {
				id: faker.random.word(),
				iconKey: undefined, // no icon key
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

		it('should NOT render the icon when the rowData has no icon value', () => {
			// given
			const columnData = {
				id: faker.random.word(),
				iconKey: 'icon',
			};
			const noIconRowData = {
				...rowData,
				icon: undefined, // no icon name value
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={noIconRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});
	});

	describe('actions', () => {
		const rowData = {
			id: 1,
			title: faker.random.words(),
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
				id: faker.random.word(),
				actionsKey: 'actions',
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

		it('should NOT render the actions when no actions key is provided', () => {
			// given
			const columnData = {
				id: faker.random.word(),
				actionsKey: undefined, // no actions key
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={rowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});

		it('should NOT render the actions when rowData has no actions', () => {
			// given
			const columnData = {
				id: faker.random.word(),
				actionsKey: 'actions',
			};
			const noActionsRowData = {
				...rowData,
				actions: undefined, // not actions
			};

			// when
			const wrapper = shallow(
				<CellTitle
					cellData={faker.random.words()}
					columnData={columnData}
					rowData={noActionsRowData}
					rowIndex={1}
				/>,
			);

			// then
			expect(wrapper.node).toMatchSnapshot();
		});
	});
});
