import React from 'react';
import CellTitle from '../CellTitle';
import VirtualizedList from '../VirtualizedList.component';
import {
	getCellRenderer,
	getId,
	getColumnData,
	getDataKey,
	getLabel,
	getRowData,
	getCellData,
	extractSpecialFields,
	renderCell,
} from './gridrow';
import { internalIds } from './constants';
import collection from '../collection';

describe('gridrow', () => {
	describe('#getCellRenderer', () => {
		it('should return cell renderer from content field props', () => {
			// given
			const cellRenderer = () => (<div />);
			const field = {
				props: { cellRenderer },
			};

			// when
			const renderer = getCellRenderer(field);

			// then
			expect(renderer).toBe(cellRenderer);
		});
	});

	describe('#getId', () => {
		it('should return id from parent props', () => {
			// given
			const parent = {
				props: { id: 'my-id' },
			};

			// when
			const id = getId(parent);

			// then
			expect(id).toBe('my-id');
		});
	});

	describe('#getColumnData', () => {
		it('should return column data from field, enhanced with id from parent props', () => {
			// given
			const parent = {
				props: { id: 'my-id' },
			};
			const field = {
				props: {
					columnData: { info: 'lol' },
				},
			};

			// when
			const columnData = getColumnData(parent, field);

			// then
			expect(columnData).toEqual({
				id: 'my-id',
				info: 'lol',
			});
		});
	});

	describe('#getDataKey', () => {
		it('should return data property key from content field props', () => {
			// given
			const field = {
				props: {
					dataKey: 'lol',
				},
			};

			// when
			const dataKey = getDataKey(field);

			// then
			expect(dataKey).toEqual('lol');
		});
	});

	describe('#getLabel', () => {
		it('should return label from content field props', () => {
			// given
			const field = {
				props: {
					label: 'lol',
				},
			};

			// when
			const label = getLabel(field);

			// then
			expect(label).toEqual('lol');
		});
	});

	describe('#getRowData', () => {
		it('should return row data from parent props', () => {
			// given
			const parent = {
				props: {
					rowGetter: index => collection[index],
				},
			};

			// when
			const rowData = getRowData(parent, 1);

			// then
			expect(rowData).toBe(collection[1]);
		});
	});

	describe('#getCellData', () => {
		it('should return cellDataGetter result', () => {
			// given
			const expectedResult = { cell: 'data' };
			const cellDataGetter = jest.fn();
			cellDataGetter.mockReturnValueOnce(expectedResult);

			const columnData = { custom: 'lol' };
			const parent = {
				props: {
					id: 'my-item-id',
					rowGetter: index => collection[index],
				},
			};

			const field = {
				props: {
					cellDataGetter,
					columnData,
					dataKey: 'name',
				},
			};

			// when
			const cellData = getCellData(field, parent, 1);

			// then
			expect(cellDataGetter).toBeCalledWith({
				columnData: { id: 'my-item-id', custom: 'lol' },
				dataKey: 'name',
				rowData: collection[1],
			});
			expect(cellData).toBe(expectedResult);
		});
	});

	describe('#extractSpecialFields', () => {
		it('should extract title and selection content fields', () => {
			// given
			const fields = [
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
					width={50}
				/>,
				<VirtualizedList.Content
					label="Name"
					dataKey="name"
					width={350}
					{...CellTitle}
				/>,
				<VirtualizedList.Content
					label=""
					dataKey="actions"
					width={120}
				/>,
				<VirtualizedList.Content
					id={internalIds.rowSelector}
					label=""
					dataKey=""
					width={50}
				/>,
			];
			const parent = {
				props: { children: fields },
			};

			// when
			const result = extractSpecialFields(parent);

			// then
			const children = React.Children.toArray(fields);
			expect(result).toEqual({
				titleField: children[1],
				selectionField: children[3],
				otherFields: [children[0], children[2]],
			});
		});
	});

	describe('#renderCell', () => {
		it('should render content field', () => {
			// given
			/* eslint-disable react/prop-types */
			function cellRenderer(props) {
				return (<div>
					cellData: {props.cellData}
					columnData: {JSON.stringify(props.columnData)}
					dataKey: {props.dataKey}
					rowData: {JSON.stringify(props.rowData)}
					rowIndex: {props.rowIndex}
				</div>);
			}
			/* eslint-enable react/prop-types */
			const field = (<VirtualizedList.Content
				label="Id"
				dataKey="id"
				width={50}
				cellRenderer={cellRenderer}
				columnData={{ custom: 'lol' }}
			/>);
			const parent = {
				props: {
					id: 'my-id',
					rowGetter: index => collection[index],
				},
			};

			// when
			const result = renderCell(1, parent, field);

			// then
			expect(result).toMatchSnapshot();
		});
	});
});
