import React from 'react';
import { render } from '@testing-library/react';
import BadgeSeparator from './BadgeSeparator.component';

describe('BadgeSeparator', () => {
	it('should default render', () => {
		// when
		render(<BadgeSeparator />);
		// then
		expect(document.querySelector('.tc-badge-separator')).toBeInTheDocument();
	});
	it('should render with icon separator class', () => {
		// given
		const iconSeparator = true;
		// when
		render(<BadgeSeparator iconSeparator={iconSeparator} />);
		// then
		expect(document.querySelector('.tc-badge-separator-icon')).toBeInTheDocument();
	});
});
