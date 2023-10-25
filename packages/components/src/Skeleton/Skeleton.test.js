import { screen, render } from '@testing-library/react';
import Skeleton from './Skeleton.component';

jest.unmock('@talend/design-system');

describe('Skeleton', () => {
	function t(msgid, options = {}) {
		if (options.type) {
			return options.defaultValue.replace('{{type}}', options.type);
		}
		return options.defaultValue || msgid;
	}
	it('should render span with aria label', () => {
		render(<Skeleton type="text" t={t} />);
		const element = document.querySelector('.tc-skeleton');
		expect(element.tagName).toBe('SPAN');
		expect(screen.getByLabelText('text Loading...')).toBeVisible();
	});
	it('should use style to apply with/height', () => {
		render(<Skeleton type="text" t={t} width={80} height={30} />);
		expect(document.querySelector('.tc-skeleton')).toHaveStyle('height: 30px; width: 80px');
	});
	it('should use className to apply size', () => {
		render(<Skeleton type="text" t={t} size={Skeleton.SIZES.small} />);
		expect(document.querySelector('.tc-skeleton-text-small')).toBeVisible();
	});
	it('should render icon for type=icon', () => {
		render(<Skeleton type="icon" name="test-icon" t={t} />);
		const icon = document.querySelector('svg');
		expect(icon).toBeVisible();
		expect(icon).toHaveAttribute('aria-hidden', 'true');
		expect(icon).toHaveAttribute('aria-label', 'icon Loading...');
		expect(icon).toHaveAttribute('name', 'test-icon');
	});
});
