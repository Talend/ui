import { manageCtrlKey, manageShiftKey, deleteSelectedItems, resetItems } from './utils.js';

describe('Enumeration', () => {
	describe('Ctrl key', () => {
		it('should unselect a value by pressing ctrl key', () => {
			// given
			const items = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
			];
			const expectedItems = [
				{ values: ['toto'], isSelected: false },
				{ values: ['tata'], isSelected: true },
			];

			// when
			const result = manageCtrlKey(0, items);

			// then
			expect(result).toEqual(expectedItems);
		});

		it('should select a value by pressing ctrl key', () => {
			// given
			const items = [{ values: ['toto'], isSelected: true }, { values: ['tata'] }];
			const expectedItems = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
			];

			// when
			const result = manageCtrlKey(1, items);

			// then
			expect(result).toEqual(expectedItems);
		});
	});

	describe('shift key', () => {
		it('should unselect a range', () => {
			// given

			const items = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
				{ values: ['titi'], isSelected: true },
				{ values: ['tutu'], isSelected: true },
			];

			const expectedItems = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
				{ values: ['titi'], isSelected: false },
				{ values: ['tutu'], isSelected: false },
			];

			// when
			const result = manageShiftKey(1, items);

			// then
			expect(result).toEqual(expectedItems);
		});

		it('should select a range after current item', () => {
			// given
			const items = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
				{ values: ['titi'] },
				{ values: ['tutu'] },
			];
			const expectedItems = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
				{ values: ['titi'], isSelected: true },
				{ values: ['tutu'], isSelected: true },
			];

			// when
			const result = manageShiftKey(3, items);

			// then
			expect(result).toEqual(expectedItems);
		});

		it('should select a range before current item', () => {
			// given
			const items = [
				{ values: ['toto'] },
				{ values: ['tata'] },
				{ values: ['titi'], isSelected: true },
				{ values: ['tutu'], isSelected: true },
			];
			const expectedItems = [
				{ values: ['toto'], isSelected: true },
				{ values: ['tata'], isSelected: true },
				{ values: ['titi'], isSelected: true },
				{ values: ['tutu'], isSelected: true },
			];

			// when
			const result = manageShiftKey(0, items);

			// then
			expect(result).toEqual(expectedItems);
		});
	});

	describe('manage items deletion ', () => {
		it('should delete selected items', () => {
			// given
			const items = [
				{ values: ['toto'] },
				{ values: ['tata'] },
				{ values: ['titi'], isSelected: true },
				{ values: ['tutu'], isSelected: true },
			];
			const expectedItems = [{ values: ['toto'] }, { values: ['tata'] }];

			// when
			const result = deleteSelectedItems(items);

			// then
			expect(result).toEqual(expectedItems);
		});
	});

	describe('manage items reset ', () => {
		it('should reset items', () => {
			// given
			const items = [{ displayMode: 'DISPLAY_MODE_EDIT' }, { displayMode: '' }];
			const expectedItems = [
				{ displayMode: 'DISPLAY_MODE_DEFAULT' },
				{ displayMode: 'DISPLAY_MODE_DEFAULT' },
			];

			// when
			const result = resetItems(items);

			// then
			expect(result).toEqual(expectedItems);
		});
	});
});
