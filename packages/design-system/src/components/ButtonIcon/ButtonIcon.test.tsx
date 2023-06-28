import { axe, toHaveNoViolations } from 'jest-axe';
import { render, act } from '@testing-library/react';
import { ButtonIcon, ButtonIconFloating, ButtonIconToggle } from './';

expect.extend(toHaveNoViolations);

describe('ButtonIcon', () => {
	it('should render accessible button', async () => {
		const { container } = render(
			<ButtonIcon aria-label="should be required" icon="talend-arrow-left" onClick={() => {}}>
				children is considered as description
			</ButtonIcon>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
		expect(container.firstChild).toHaveAttribute('aria-describedby', 'id-42');
	});
});
