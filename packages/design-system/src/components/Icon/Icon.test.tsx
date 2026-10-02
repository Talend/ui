/* eslint-disable import/no-extraneous-dependencies */
import { axe } from 'jest-axe';
import { render, waitFor } from '@testing-library/react';
import { Icon } from './';

describe('Icon', () => {
	it('should render a11y html', async () => {
		global.self.fetch.mockResponse = {
			status: 200,
			ok: true,
			text: () =>
				new Promise(resolve => {
					resolve(undefined);
				}),
		};
		const { container } = render(
			<main>
				<Icon name="pencil" />
				<Icon name="src-https://statics-dev.cloud.talend.com/@talend/common/images/favicon-logo-square.ico" />
				<Icon name="remote-https://statics.cloud.talend.com/@talend/icons/6.1.5/src/svg/core/abc.svg" />
			</main>,
		);
		expect(container.firstChild).toMatchSnapshot();
		const results = await axe(document.body);
		expect(results).toHaveNoViolations();
	});
});

describe('Icon security', () => {
	const mockFetch = (body: string) => {
		const fetchMock = vi.fn().mockResolvedValue({
			status: 200,
			ok: true,
			text: () => Promise.resolve(body),
		});
		global.self.fetch = fetchMock;
		return fetchMock;
	};

	it('should sanitize remote svg before injecting it', async () => {
		mockFetch(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" onload="alert(1)"><svg onload="alert(2)"></svg><image href="x" onerror="alert(3)"/><foreignObject><iframe/></foreignObject><set attributeName="onmouseover" to="alert(4)"/><a href="javascript:alert(5)"><path d="M0 0" onclick="alert(6)"/></a><path d="M0 0h1" fill="red"/></svg>',
		);
		const { container } = render(<Icon name="remote-https://example.com/x.svg" />);
		await waitFor(() => expect(container.querySelector('path[fill="red"]')).toBeInTheDocument());
		const html = container.innerHTML;
		expect(html).not.toMatch(/onload|onerror|onclick|foreignObject|javascript:|<image|<set|<a /i);
		expect(container.querySelector('svg svg')).toBeInTheDocument();
	});

	it('should not fetch remote urls with a non http(s) scheme', () => {
		const fetchMock = mockFetch('<svg xmlns="http://www.w3.org/2000/svg"></svg>');
		render(<Icon name="remote-javascript:alert(1)" />);
		render(<Icon name="remote-data:image/svg+xml,<svg/>" />);
		expect(fetchMock).not.toHaveBeenCalled();
	});

	it('should not forward dangerouslySetInnerHTML or invalid props', () => {
		const props = {
			name: 'talend-x',
			dangerouslySetInnerHTML: { __html: '<img src=x onerror=alert(1)>' },
			style: 'invalid',
			'data-testid': 'my-icon',
		} as any;
		const { container } = render(<Icon {...props} />);
		expect(container.querySelector('img')).not.toBeInTheDocument();
		const svg = container.querySelector('svg') as SVGElement;
		expect(svg.getAttribute('data-testid')).toBe('my-icon');
		expect(svg.hasAttribute('style')).toBe(false);
	});

	it('should not throw on icon names that are not valid selectors', () => {
		expect(() => render(<Icon name={'x"] , body #y['} />)).not.toThrow();
	});
});
