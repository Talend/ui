import React from 'react';
import VirtualizedList from '..';
import { insertSelectionConfiguration, toColumns } from './tablerow';

describe('tablerow', () => {
	describe('#insertSelectionConfiguration', () => {
		it('should insert selection column when selection callback is provided', () => {
			// given
			const isSelected = jest.fn();
			const selectionToggle = jest.fn();
			const children = [
				<VirtualizedList.Content label="Id" dataKey="id" width={50} />,
				<VirtualizedList.Content label="Name" dataKey="name" width={350} />,
			];

			// when
			const result = insertSelectionConfiguration({ isSelected, selectionToggle, children });

			// then
			expect(result).toMatchSnapshot();
		});

		it('should NOT insert selection column when selection callback is NOT provided', () => {
			// given
			const children = [
				<VirtualizedList.Content label="Id" dataKey="id" width={50} />,
				<VirtualizedList.Content label="Name" dataKey="name" width={350} />,
			];

			// when
			const result = insertSelectionConfiguration({ children });

			// then
			expect(result).toMatchSnapshot();
		});
	});

	describe('#toColumns', () => {
		it('should create column with enhanced header classname from theme', () => {
			// given
			const theme = { header: 'theme-header-classname' };
			const children = [
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
					headerClassName="my-header-classname"
					width={50}
				/>,
			];

			// when
			const result = toColumns({ theme, children });

			// then
			expect(result).toMatchSnapshot();
		});

		it('should create column with enhanced classname from theme', () => {
			// given
			const theme = { cell: 'theme-classname' };
			const children = [
				<VirtualizedList.Content label="Id" dataKey="id" className="my-classname" width={50} />,
			];

			// when
			const result = toColumns({ theme, children });

			// then
			expect(result).toMatchSnapshot();
		});

		it('should add id in columns data', () => {
			// given
			const id = 'my-id';
			const children = [
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
					columnData={{ custom: 'lol' }}
					width={50}
				/>,
			];

			// when
			const result = toColumns({ id, theme: {}, children });

			// then
			expect(result).toMatchSnapshot();
		});
		it('should return a column with fixed width', () => {
			// given
			const id = 'my-id';
			const children = [
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
					columnData={{ custom: 'lol' }}
					width={50}
				/>,
			];
			// when
			const result = toColumns({
				id,
				theme: {},
				children,
				columnsWidths: [{ dataKey: 'id', width: 50 }],
			});
			// them
			expect(result).toMatchSnapshot();
		});
		it('should return a column with resizable width and classname', () => {
			// given
			const id = 'my-id';
			const children = [
				<VirtualizedList.Content
					label="Id"
					dataKey="id"
					columnData={{ custom: 'lol' }}
					width={50}
				/>,
			];
			// when
			const result = toColumns({
				id,
				theme: {},
				children,
				columnsWidths: [{ dataKey: 'id', width: 50, resized: true, resizable: true }],
			});
			// them
			expect(result).toMatchSnapshot();
		});
	});
});
