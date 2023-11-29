import { screen, render, fireEvent } from '@testing-library/react';

import { HeaderResizable } from './HeaderResizable.component';
import { virtualizedListContext } from '../virtualizedListContext';

describe('HeaderResizable', () => {
	it('should render with no specific props', () => {
		const resizeColumn = jest.fn();
		// when
		const { container } = render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable />
			</virtualizedListContext.Provider>,
		);
		// then
		expect(container.firstChild).toMatchSnapshot();
		expect(resizeColumn).not.toHaveBeenCalled();
	});
	it('should render with label', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		// when
		render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);
		// then
		expect(screen.getByText(label)).toBeInTheDocument();
	});
	it('should render children', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		const custom = 'This is a custom resizable header';
		// when
		render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable>
					<button id="myCustomButton">{label}</button>
					<span>{custom}</span>
				</HeaderResizable>
			</virtualizedListContext.Provider>,
		);
		// then
		expect(screen.getByText(label)).toBeVisible();
		expect(screen.getByText(custom)).toBeVisible();
	});
	it('should change resizing state when dragging is trigger', () => {
		// given
		const resizeColumn = jest.fn();
		const label = 'my header label';
		// when
		const { container } = render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);
		fireEvent.mouseDown(screen.getByTestId('draggable'));
		// userEvent.click(screen.getByTestId('draggable'));

		// then
		expect(document.querySelectorAll('.tc-header-cell-resizable')).toHaveLength(1);
		expect(container.firstChild).toHaveClass('tc-header-cell-resizable-resizing');
	});
	it('should change resizing state when dragging is ended', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();

		// when
		const { container } = render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable label={label} />
			</virtualizedListContext.Provider>,
		);

		// then
		fireEvent.mouseDown(screen.getByTestId('draggable'));
		expect(container.firstChild).toHaveClass('tc-header-cell-resizable-resizing');
		fireEvent.mouseUp(screen.getByTestId('draggable'));
		expect(container.firstChild).not.toHaveClass('tc-header-cell-resizable-resizing');
	});
	it('should change the width by 10 when right keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);

		// when
		fireEvent.mouseDown(screen.getByTestId('resize-input-button-ally'));
		fireEvent.keyDown(screen.getByTestId('resize-input-button-ally'), { key: 'ArrowRight' });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, 10);
	});
	it('should change the width by 10 when enter keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);
		// when
		fireEvent.keyDown(screen.getByTestId('resize-input-button-ally'), { key: 'something' });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, 0);
	});
	it('should change the width by -10 when left keyboard is trigger', () => {
		// given
		const label = 'my header label';
		const resizeColumn = jest.fn();
		const dataKey = 'myDataKey';
		render(
			<virtualizedListContext.Provider value={{ resizeColumn }}>
				<HeaderResizable dataKey={dataKey} label={label} />
			</virtualizedListContext.Provider>,
		);
		// when
		fireEvent.keyDown(screen.getByTestId('resize-input-button-ally'), { key: 'ArrowLeft' });
		// then
		expect(resizeColumn).toHaveBeenNthCalledWith(1, dataKey, -10);
	});
});
