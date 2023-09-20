import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import Component from './RowCheckbox.component';

jest.unmock('@talend/design-system');

describe('RowCheckBox', () => {
	it('should render a checked checkbox input by default', () => {
		// Given
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			onChange: jest.fn(),
		};
		// When
		const { container } = render(<Component {...props} />);
		// Then
		expect(screen.getByRole('checkbox')).toBeVisible();
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render a locked item', () => {
		// Given
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			locked: true,
			onChange: jest.fn(),
		};
		// When
		render(<Component {...props} />);
		// Then
		expect(document.querySelectorAll('use[xlink:href="#locker-closed:M"]')).toHaveLength(1);
	});
	it('should call the onClick when checkbox trigger change', () => {
		// Given
		const onChange = jest.fn();
		const props = {
			dataFeature: 'my-feature',
			describedby: 'my-div-desc',
			description: 'this is my checkbox',
			id: 'some-id',
			label: 'column-label',
			onChange,
		};
		// When
		render(<Component {...props} />);
		userEvent.click(screen.getByRole('checkbox'));
		// Then
		expect(onChange).toHaveBeenNthCalledWith(1, true, 'column-label');
	});
});
