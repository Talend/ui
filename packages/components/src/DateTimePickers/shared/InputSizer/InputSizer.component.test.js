import { screen, render } from '@testing-library/react';

import InputSizer from './InputSizer.component';

describe('InputSizer', () => {
	it('should call children with width', () => {
		// given
		const children = jest.fn();
		const placeholder = 'YYYY-MM-DD';
		window.HTMLElement.prototype.getBoundingClientRect = () => ({ width: 42 });

		// when
		render(<InputSizer placeholder={placeholder}>{children}</InputSizer>);

		// then
		expect(children).toHaveBeenCalledWith(47);
	});
	it('should apply inputText style when there is input', () => {
		// given
		const children = jest.fn();
		// when
		render(
			<InputSizer placeholder="HH:mm" inputText="2019-08-21">
				{children}
			</InputSizer>,
		);
		// then
		const style = screen.getByTestId('InputSizer').getAttribute('style');
		expect(style).toEqual(
			'padding: 0px 1rem; font-size: 1.4rem; visibility: hidden; position: absolute;',
		);
	});
});
