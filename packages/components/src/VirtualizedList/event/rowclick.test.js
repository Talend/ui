import { decorateRowClick, decorateRowDoubleClick } from './rowclick';

describe('rowclick', () => {
	describe('#decorateRowDoubleClick', () => {
		it('should not trigger double click callbacks on action double click', () => {
			// given
			const onRowDoubleClick = jest.fn();
			const checkboxEvent = { target: { tagName: 'SPAN', className: 'tc-cell-checkbox' } };
			const inputEvent = { target: { tagName: 'INPUT' } };
			const textareaEvent = { target: { tagName: 'TEXTAREA' } };
			const buttonEvent = { target: { tagName: 'BUTTON' } };
			const selectEvent = { target: { tagName: 'SELECT' } };
			const innerActionEvent = {
				target: { tagName: 'SPAN', parentElement: { tagName: 'BUTTON' } },
			};
			const nonActionEvent = { target: { tagName: 'SPAN', parentElement: { tagName: 'SPAN' } } };

			const decoratedRowDoubleClick = decorateRowDoubleClick(onRowDoubleClick);

			// when / then
			decoratedRowDoubleClick({ event: checkboxEvent });
			expect(onRowDoubleClick).not.toBeCalled();

			decoratedRowDoubleClick({ event: inputEvent });
			expect(onRowDoubleClick).not.toBeCalled();

			decoratedRowDoubleClick({ event: textareaEvent });
			expect(onRowDoubleClick).not.toBeCalled();

			decoratedRowDoubleClick({ event: buttonEvent });
			expect(onRowDoubleClick).not.toBeCalled();

			decoratedRowDoubleClick({ event: selectEvent });
			expect(onRowDoubleClick).not.toBeCalled();

			decoratedRowDoubleClick({ event: innerActionEvent });
			expect(onRowDoubleClick).not.toBeCalled();

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
