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

	it('should drop xlink href whatever the namespace prefix is', async () => {
		mockFetch(
			'<svg xmlns="http://www.w3.org/2000/svg" xmlns:x="http://www.w3.org/1999/xlink"><use x:href="https://evil.example/a.svg#b"/><use x:href="#local" id="ok"/></svg>',
		);
		const { container } = render(<Icon name="remote-https://example.com/prefix.svg" />);
		await waitFor(() => expect(container.querySelector('use#ok')).toBeInTheDocument());
		expect(container.innerHTML).not.toContain('evil.example');
	});

	it('should only keep allowlisted attributes and local url references', async () => {
		mockFetch(
			'<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" data-x="1" xmlns:foo="urn:foo" foo:bar="1">' +
				'<path id="keep" d="M0 0" fill="url(/endpoint)" stroke="url(https://evil.example/x)" custom="1" data-y="2"/>' +
				'<path id="local" d="M0 0" fill="url(#grad)" filter="url(\'#f\')" clip-path="url(#c)"/>' +
				'<path id="esc" d="M0 0" mask="\\75rl(/endpoint)"/>' +
				'<path id="plain" d="M0 0" fill="#fff"/></svg>',
		);
		const { container } = render(<Icon name="remote-https://example.com/allow.svg" />);
		await waitFor(() => expect(container.querySelector('#plain')).toBeInTheDocument());
		const keep = container.querySelector('#keep') as Element;
		expect(keep.getAttribute('d')).toBe('M0 0');
		['fill', 'stroke', 'custom', 'data-y'].forEach(name =>
			expect(keep.hasAttribute(name)).toBe(false),
		);
		const local = container.querySelector('#local') as Element;
		expect(local.getAttribute('fill')).toBe('url(#grad)');
		expect(local.getAttribute('filter')).toBe("url('#f')");
		expect(local.getAttribute('clip-path')).toBe('url(#c)');
		expect((container.querySelector('#esc') as Element).hasAttribute('mask')).toBe(false);
		const svg = container.querySelector('svg svg') as Element;
		expect(svg.hasAttribute('data-x')).toBe(false);
		expect(svg.hasAttribute('foo:bar')).toBe(false);
		expect(svg.getAttribute('viewBox')).toBe('0 0 16 16');
		expect(container.querySelector('#plain')?.getAttribute('fill')).toBe('#fff');
	});
});
