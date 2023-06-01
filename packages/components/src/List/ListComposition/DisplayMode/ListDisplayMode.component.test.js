/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import ListDisplayMode from './ListDisplayMode.component';
import { ListContext } from '../context';
import getDefaultT from '../../../translate';

jest.unmock('@talend/design-system');

describe('List DisplayMode', () => {
	it('should render', () => {
		// given
		const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

		// when
		const { container } = render(
			<ListContext.Provider value={contextValue}>
				<ListDisplayMode id="myDisplayMode" />
			</ListContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render children', () => {
		// given
		const contextValue = {
			displayMode: 'table',
			setDisplayMode: jest.fn(),
			t: getDefaultT(),
		};
		const onClickOne = jest.fn();
		const onChange = jest.fn();
		// when
		render(
			<ListContext.Provider value={contextValue}>
				<ListDisplayMode id="myDisplayMode" onChange={onChange}>
					<button type="button" onClick={onClickOne}>
						my button
					</button>
				</ListDisplayMode>
			</ListContext.Provider>,
		);

		// then
		userEvent.click(screen.getByText('my button'));
		expect(onClickOne).toHaveBeenCalled();
	});

	describe('uncontrolled mode', () => {
		it('should propagate initial value', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			render(
				<ListContext.Provider initialDisplayMode="large" value={contextValue}>
					<ListDisplayMode id="myDisplayMode" />
				</ListContext.Provider>,
			);

			// then
			screen.getAllByRole('button')[0].focus();
			expect(screen.getByText('Set Table as current display mode.')).toBeVisible();
		});

		it('should propagate display mode', () => {
			// given
			const contextValue = { setDisplayMode: jest.fn(), t: getDefaultT() };

			render(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" />
				</ListContext.Provider>,
			);

			userEvent.click(screen.getAllByRole('button')[1]);

			// then
			expect(contextValue.setDisplayMode).toHaveBeenNthCalledWith(1, 'large');
		});
	});

	describe('controlled mode', () => {
		it('should render selected display mode', () => {
			// given
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };

			// when
			render(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" selectedDisplayMode="large" />
				</ListContext.Provider>,
			);
			userEvent.click(screen.getAllByRole('button')[1]);

			// then
			expect(screen.getAllByRole('button')[1]).toHaveAttribute('aria-pressed', 'true');
			expect(screen.getAllByRole('button')[0]).toHaveAttribute('aria-pressed', 'false');
		});

		it('should call props.onChange with new display mode', () => {
			// given
			const contextValue = { displayMode: 'table', setDisplayMode: jest.fn(), t: getDefaultT() };
			const onChange = jest.fn();

			render(
				<ListContext.Provider value={contextValue}>
					<ListDisplayMode id="myDisplayMode" selectedDisplayMode="large" onChange={onChange} />
				</ListContext.Provider>,
			);

			expect(contextValue.setDisplayMode).not.toBeCalled();

			// when: react-bootstrap use value-event instead of event-value
			userEvent.click(screen.getAllByRole('button')[1]);

			// then
			expect(contextValue.setDisplayMode).not.toBeCalled();
			expect(onChange).toBeCalledWith(expect.anything(), 'large');
		});
	});
});
