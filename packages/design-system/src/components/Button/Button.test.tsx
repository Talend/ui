import { describe, it, expect } from '@jest/globals';
import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Button } from './';

describe('Button', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Button onClick={jest.fn()} variant="primary">
					Primary
				</Button>
				<Button onClick={jest.fn()} variant="destructive" icon="trash">
					Destructive
				</Button>
				<Button onClick={jest.fn()} variant="secondary" disabled>
					Secondary disabled
				</Button>
				<Button onClick={jest.fn()} variant="tertiary" type="submit">
					Tertiary submit
				</Button>
				<Button onClick={jest.fn()} variant="tertiary" isLoading>
					Tertiary isLoading
				</Button>
				<Button onClick={jest.fn()} variant="tertiary" isDropdown>
					Tertiary isDropdown
				</Button>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
