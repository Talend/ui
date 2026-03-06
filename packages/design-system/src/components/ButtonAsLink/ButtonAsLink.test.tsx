import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { ButtonAsLink } from './';

describe('ButtonAsLink', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<ButtonAsLink onClick={vi.fn()} variant="primary">
					Primary
				</ButtonAsLink>
				<ButtonAsLink onClick={vi.fn()} variant="destructive" icon="trash">
					Destructive
				</ButtonAsLink>
				<ButtonAsLink onClick={vi.fn()} variant="secondary">
					Secondary
				</ButtonAsLink>
				<ButtonAsLink onClick={vi.fn()} variant="tertiary" type="submit">
					Tertiary submit
				</ButtonAsLink>
				<ButtonAsLink onClick={vi.fn()} variant="tertiary">
					Tertiary
				</ButtonAsLink>
				<ButtonAsLink onClick={vi.fn()} variant="tertiary">
					Tertiary
				</ButtonAsLink>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
