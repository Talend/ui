/* eslint-disable import/no-extraneous-dependencies */
import { axe } from 'jest-axe';
import { render, screen } from '@testing-library/react';
import { Link } from '../Link';
import { Breadcrumbs } from '../Breadcrumbs';
import { Dropdown } from '../Dropdown';
import { Linkable } from './';

vi.mock('@talend/utils', () => {
	let i = 0;
	return { randomUUID: () => `mocked-uuid-${i++}` };
});

const UNSAFE_HREFS = [
	'javascript:alert(1)',
	'JAVA\tSCRIPT:alert(1)',
	' javascript:alert(1)',
	'data:text/html,<script>alert(1)</script>',
	'vbscript:msgbox(1)',
];
const SAFE_HREFS = ['https://www.talend.com', 'http://www.talend.com', '/path', '#anchor'];

describe('Linkable', () => {
	it('should render a11y html', async () => {
		const { container } = render(
			<main>
				<Linkable href="#" data-testid="my.Linkable">
					Linkable example
				</Linkable>
				<Linkable href="#" icon="information-filled">
					Linkable example
				</Linkable>
				<Linkable href="https://www.talend.com">Linkable example</Linkable>
			</main>,
		);
		// eslint-disable-next-line testing-library/no-container
		container.querySelector('button')?.click();
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});

	describe('href scheme validation', () => {
		it.each(UNSAFE_HREFS)('should not render %j on an anchor', href => {
			render(<Linkable href={href}>Unsafe</Linkable>);
			expect(screen.getByText('Unsafe').closest('a')?.getAttribute('href')).toBeNull();
		});

		it.each(UNSAFE_HREFS)('should not forward %j to a custom `as` element', href => {
			render(
				<Linkable href={href} as={<a data-testid="custom" />}>
					Unsafe
				</Linkable>,
			);
			expect(screen.getByTestId('custom').getAttribute('href')).toBeNull();
		});

		it.each(SAFE_HREFS)('should keep %s', href => {
			render(<Linkable href={href}>Safe</Linkable>);
			expect(screen.getByText('Safe').closest('a')?.getAttribute('href')).toBe(href);
		});

		it.each(UNSAFE_HREFS)('should not render %j through Link', href => {
			render(<Link href={href}>Unsafe</Link>);
			expect(screen.getByText('Unsafe').closest('a')?.getAttribute('href')).toBeNull();
		});

		it.each(UNSAFE_HREFS)('should not render %j through Breadcrumbs', href => {
			render(
				<Breadcrumbs
					items={
						[
							{ label: 'Home', href: '/' },
							{ label: 'Unsafe', href },
							{ label: 'Current', href: '/current' },
						] as any
					}
				/>,
			);
			expect(screen.getByText('Unsafe').closest('a')?.getAttribute('href')).toBeNull();
		});

		it.each(UNSAFE_HREFS)('should not render %j through Dropdown items', href => {
			render(
				<Dropdown
					aria-label="Menu"
					items={[{ label: 'Typed', href, type: 'link' }, { label: 'Untyped', href } as any]}
				>
					<button type="button">Menu</button>
				</Dropdown>,
			);
			expect(screen.getByText('Typed').closest('a')?.getAttribute('href')).toBeNull();
			expect(screen.getByText('Untyped').closest('a')?.getAttribute('href')).toBeNull();
		});
	});
});
