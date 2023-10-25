import { render } from '@testing-library/react';
import Component from './RowLabel.component';

describe('RowLabel', () => {
	it('should render the props label', () => {
		// Given
		const label = 'Hello world';
		// When
		const { container } = render(<Component label={label} />);
		// Then
		expect(container.firstChild).toMatchSnapshot();
	});
});
