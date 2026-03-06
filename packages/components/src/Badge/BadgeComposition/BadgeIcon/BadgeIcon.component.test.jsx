import { render } from '@testing-library/react';
import BadgeIcon from './BadgeIcon.component';

const iconMock = vi.hoisted(() =>
	vi.fn(({ name, className }) => <span role="img" name={name} className={className} />),
);

vi.mock('../../../Icon', () => ({
	default: iconMock,
}));

describe('BadgeIcon', () => {
	it('should default render', () => {
		// given
		const name = 'my icon name';
		// when
		const { baseElement } = render(<BadgeIcon name={name} />);
		// then
		expect(iconMock).toHaveBeenCalledWith(
			expect.objectContaining({
				name,
			}),
			expect.anything(),
		);
		expect(iconMock.mock.calls[0][0].className).toContain('tc-badge-label-icon');
		expect(baseElement).toMatchSnapshot();
	});
});
