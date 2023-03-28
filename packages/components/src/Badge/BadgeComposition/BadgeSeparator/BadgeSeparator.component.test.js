import React from 'react';
import { render } from '@testing-library/react';
import BadgeSeparator from './BadgeSeparator.component';

describe('BadgeSeparator', () => {
	it('should default render', () => {
		// when
		const { baseElement } = render(<BadgeSeparator />);
		// then
		expect(document.querySelector('.tc-badge-separator')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});
	it('should render with icon separator class', () => {
		// given
		const iconSeparator = true;
		// when
		const { baseElement } = render(<BadgeSeparator iconSeparator={iconSeparator} />);
		// then
		expect(document.querySelector('.tc-badge-separator-icon')).toBeInTheDocument();
		expect(baseElement).toMatchSnapshot();
	});
});
