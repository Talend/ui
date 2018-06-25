import each from 'jest-each';
import { decorateRowClick, decorateRowDoubleClick } from './rowclick';

describe('rowclick', () => {
	describe('#decorateRowDoubleClick', () => {
		const checkboxEvent = { target: { tagName: 'SPAN', className: 'tc-cell-checkbox' } };
		const inputEvent = { target: { tagName: 'INPUT' } };
		const textareaEvent = { target: { tagName: 'TEXTAREA' } };
		const buttonEvent = { target: { tagName: 'BUTTON' } };
		const selectEvent = { target: { tagName: 'SELECT' } };
		const innerActionEvent = {
			target: { tagName: 'SPAN', parentElement: { tagName: 'BUTTON' } },
		};

		each([
			['checkbox', checkboxEvent],
			['input', inputEvent],
			['textarea', textareaEvent],
			['button', buttonEvent],
			['select', selectEvent],
			['inner', innerActionEvent],
		]).test(
			'should not trigger double click callbacks on %s action double click',
			(name, event) => {
				// given
				const onRowDoubleClick = jest.fn();
				const decoratedRowDoubleClick = decorateRowDoubleClick(onRowDoubleClick);

				// when / then
				decoratedRowDoubleClick({ event });
				expect(onRowDoubleClick).not.toBeCalled();
			},
		);

		it('should trigger double click callbacks on non-action double click', () => {
			// when
			const nonActionEvent = { target: { tagName: 'SPAN', parentElement: { tagName: 'SPAN' } } };
			const onRowDoubleClick = jest.fn();
			const decoratedRowDoubleClick = decorateRowDoubleClick(onRowDoubleClick);

			// then
			decoratedRowDoubleClick({ event: nonActionEvent });
			expect(onRowDoubleClick).toBeCalled();
		});

		it('should return null when there is no rowClick callback', () => {
			// when
			const decoratedRowDoubleClick = decorateRowDoubleClick(null);

			// then
			expect(decoratedRowDoubleClick).toBeUndefined();
		});
	});

	describe('#decorateRowClick', () => {
		it('should adapt arguments to row click callback', () => {
			// given
			const onRowClick = jest.fn();
			const event = { target: {} };
			const rowData = { value: 'toto' };
			const decoratedRowClick = decorateRowClick(onRowClick);

			// when
			decoratedRowClick({ event, rowData });

			// then
			expect(onRowClick).toBeCalledWith(event, rowData);
		});

		it('should return null when there is no rowClick callback', () => {
			// when
			const decoratedRowClick = decorateRowClick(null);

			// then
			expect(decoratedRowClick).toBeUndefined();
		});
	});
});
