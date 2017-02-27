import { manageCtrlKey, manageShiftKey,
	deleteSelectedItems, computeSelectedOnDelete } from './utils.js';

describe('Enumeration', () => {
	describe('Ctrl key', () => {
		it('should unselect a value by pressing ctrl key', () => {
			// given

			const item = { index: 0 };
			const selectedItems = [0, 1];

			// when
			const result = manageCtrlKey(item, selectedItems);

			// then
			expect(result).toEqual([1]);
		});

		it('should select a value by pressing ctrl key', () => {
			// given

			const item = { index: 1 };
			const selectedItems = [0];

			// when
			const result = manageCtrlKey(item, selectedItems);

			// then
			expect(result).toEqual([0, 1]);
		});
	});

	describe('shift key', () => {
		it('should unselect a range', () => {
			// given

			const item = { index: 2 };
			const items = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];
			const selectedItems = [0, 1, 2, 3];

			// when
			const result = manageShiftKey(item, selectedItems, items);

			// then
			expect(result).toEqual([0, 1, 2]);
		});

		it('should select a range after current item', () => {
			// given
			const item = { index: 3 };
			const items = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];
			const selectedItems = [0, 1];

			// when
			const result = manageShiftKey(item, selectedItems, items);

			// then
			expect(result).toEqual([0, 1, 2, 3]);
		});

		it('should select a range before current item', () => {
			// given
			const item = { index: 0 };
			const items = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];
			const selectedItems = [2, 3];

			// when
			const result = manageShiftKey(item, selectedItems, items);

			// then
			expect(result).toEqual([0, 1, 2, 3]);
		});
	});

	describe('manage items deletion ', () => {
		it('should delete selected items', () => {
			// given

			const items = [{ index: 0 }, { index: 1 }, { index: 2 }, { index: 3 }];
			const selectedItems = [1, 2];

			// when
			const result = deleteSelectedItems(items, selectedItems);

			// then
			expect(result).toEqual([{ index: 0 }, { index: 3 }]);
		});
	});

	describe('manage selected item when deleeting one ', () => {
		it('should delete selected items', () => {
			// given
			const selectedItems = [0, 1, 2];
			const index = 1;

			// when
			const result = computeSelectedOnDelete(selectedItems, index);

			// then
			expect(result).toEqual([0, 1]);
		});
	});
});
