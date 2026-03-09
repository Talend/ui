import { axe } from 'jest-axe';
import { render } from '@testing-library/react';
import { Button } from './';

describe('Button', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Button onClick={vi.fn()} variant="primary">
					Primary
				</Button>
				<Button onClick={vi.fn()} variant="destructive" icon="trash">
					Destructive
				</Button>
				<Button onClick={vi.fn()} variant="secondary" disabled>
					Secondary disabled
				</Button>
				<Button onClick={vi.fn()} variant="tertiary" type="submit">
					Tertiary submit
				</Button>
				<Button onClick={vi.fn()} variant="tertiary" isLoading>
					Tertiary isLoading
				</Button>
				<Button onClick={vi.fn()} variant="tertiary" isDropdown>
					Tertiary isDropdown
				</Button>
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});
