import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { ButtonAsLink } from './';

describe('ButtonAsLink', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<ButtonAsLink onClick={jest.fn()} variant="primary">
					Primary
				</ButtonAsLink>
				<ButtonAsLink onClick={jest.fn()} variant="destructive" icon="trash">
					Destructive
				</ButtonAsLink>
				<ButtonAsLink onClick={jest.fn()} variant="secondary">
					Secondary
				</ButtonAsLink>
				<ButtonAsLink onClick={jest.fn()} variant="tertiary" type="submit">
					Tertiary submit
				</ButtonAsLink>
				<ButtonAsLink onClick={jest.fn()} variant="tertiary">
					Tertiary
				</ButtonAsLink>
				<ButtonAsLink onClick={jest.fn()} variant="tertiary">
					Tertiary
				</ButtonAsLink>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
