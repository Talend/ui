import React from 'react';
import { render } from '@testing-library/react';
import BadgeIcon from './BadgeIcon.component';
import Icon from '../../../Icon';
jest.unmock('@talend/design-system');

jest.mock('../../../Icon', () => {
	return jest.fn(({ name, className }) => <span role="img" name={name} className={className} />);
});
describe('BadgeIcon', () => {
	it('should default render', () => {
		// given
		const name = 'my icon name';
		// when
		const { baseElement } = render(<BadgeIcon name={name} />);
		// then
		expect(Icon).toHaveBeenCalledWith(
			{
				className: 'tc-badge-label-icon theme-tc-badge-label-icon',
				name: 'my icon name',
			},
			expect.anything(),
		);
		expect(baseElement).toMatchSnapshot();
	});
});
