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
	it('preserves ordinary SVG attributes through the shared blocklist', () => {
		const props = { name: 'talend-x', fill: 'red', strokeWidth: 2, lang: 'fr' };
		const { container } = render(<Icon {...props} />);
		const svg = container.querySelector('svg');
		expect(svg).toHaveAttribute('fill', 'red');
		expect(svg).toHaveAttribute('stroke-width', '2');
		expect(svg).toHaveAttribute('lang', 'fr');
	});

	it('prevents rest props from overriding the generated image source and description', () => {
		const props = {
			name: 'src-https://example.com/icon.png',
			src: 'https://other.example.com/icon.png',
			srcSet: 'https://other.example.com/icon.png 2x',
			alt: 'Overridden',
		};
		const { container } = render(<Icon {...props} />);
		const image = container.querySelector('img');
		expect(image).toHaveAttribute('src', 'https://example.com/icon.png');
		expect(image).toHaveAttribute('alt', 'icon');
		expect(image).not.toHaveAttribute('srcset');
	});

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
		await waitFor(() => expect(container.querySelector('use[id$="-ok"]')).toBeInTheDocument());
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
		await waitFor(() => expect(container.querySelector('[id$="-plain"]')).toBeInTheDocument());
		const keep = container.querySelector('[id$="-keep"]') as Element;
		expect(keep.getAttribute('d')).toBe('M0 0');
		['fill', 'stroke', 'custom', 'data-y'].forEach(name =>
			expect(keep.hasAttribute(name)).toBe(false),
		);
		const local = container.querySelector('[id$="-local"]') as Element;
		const prefix = (local.getAttribute('id') as string).replace(/local$/, '');
		expect(local.getAttribute('fill')).toBe(`url(#${prefix}grad)`);
		expect(local.getAttribute('filter')).toBe(`url('#${prefix}f')`);
		expect(local.getAttribute('clip-path')).toBe(`url(#${prefix}c)`);
		expect((container.querySelector('[id$="-esc"]') as Element).hasAttribute('mask')).toBe(false);
		const svg = container.querySelector('svg svg') as Element;
		expect(svg.hasAttribute('data-x')).toBe(false);
		expect(svg.hasAttribute('foo:bar')).toBe(false);
		expect(svg.getAttribute('viewBox')).toBe('0 0 16 16');
		expect(container.querySelector('[id$="-plain"]')?.getAttribute('fill')).toBe('#fff');
	});

	it('should drop remote classes and scope remote ids so they cannot collide with the host', async () => {
		mockFetch(
			'<svg xmlns="http://www.w3.org/2000/svg" class="tc-iconsprovider" viewBox="0 0 16 16">' +
				'<defs><linearGradient id="g"><stop offset="0" stop-color="red"/></linearGradient>' +
				'<clipPath id="c"><rect width="4" height="4"/></clipPath>' +
				'<symbol id="trash:M"><path d="M0 0"/></symbol><g id="talend-check" class="tc-iconsprovider"/></defs>' +
				'<use id="ref" href="#trash:M"/>' +
				'<path id="p" d="M0 0" fill="url(#g)" clip-path="url(#c)" aria-labelledby="g talend-check"/></svg>',
		);
		const { container } = render(
			<>
				<svg>
					<use xlinkHref="#trash:M" />
				</svg>
				<Icon name="remote-https://example.com/scope.svg" />
			</>,
		);
		await waitFor(() => expect(container.querySelector('svg svg')).toBeInTheDocument());
		expect(container.querySelector('.tc-iconsprovider')).not.toBeInTheDocument();
		expect(container.querySelector('[class="tc-iconsprovider"]')).toBeNull();
		expect(container.querySelector('svg svg')?.hasAttribute('class')).toBe(false);
		expect(document.getElementById('trash:M')).toBeNull();
		expect(document.getElementById('talend-check')).toBeNull();

		const gradient = container.querySelector('linearGradient') as Element;
		const clip = container.querySelector('clipPath') as Element;
		const gradientId = gradient.getAttribute('id') as string;
		const clipId = clip.getAttribute('id') as string;
		expect(gradientId).toMatch(/^tc-remote-svg-\d+-g$/);
		const path = container.querySelector('path[d="M0 0"][fill]') as Element;
		expect(path.getAttribute('fill')).toBe(`url(#${gradientId})`);
		expect(path.getAttribute('clip-path')).toBe(`url(#${clipId})`);
		expect(path.getAttribute('aria-labelledby')).toBe(
			`${gradientId} ${gradientId.replace(/g$/, 'talend-check')}`,
		);
		const symbolId = (container.querySelector('symbol') as Element).getAttribute('id');
		expect(container.querySelector('use[id$="-ref"]')?.getAttribute('href')).toBe(`#${symbolId}`);
	});

	it('should give each remote icon instance its own ids', async () => {
		mockFetch(
			'<svg xmlns="http://www.w3.org/2000/svg"><linearGradient id="g"/><path d="M0 0" fill="url(#g)"/></svg>',
		);
		const { container } = render(
			<>
				<Icon name="remote-https://example.com/one.svg" />
				<Icon name="remote-https://example.com/two.svg" />
			</>,
		);
		await waitFor(() => expect(container.querySelectorAll('linearGradient')).toHaveLength(2));
		const [first, second] = Array.from(container.querySelectorAll('linearGradient')).map(g =>
			g.getAttribute('id'),
		);
		expect(first).not.toBe(second);
	});
});
