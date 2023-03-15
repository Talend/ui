import React from 'react';
import { render } from '@testing-library/react';
import BadgeIcon from './BadgeIcon.component';
jest.unmock('@talend/design-system');

describe('BadgeIcon', () => {
	it('should default render', () => {
		// given
		const name = 'my icon name';
		// when
		render(<BadgeIcon name={name} />);
		// then
		expect(document.querySelector(`[name="${name}"]`)).toBeInTheDocument();
	});
});
