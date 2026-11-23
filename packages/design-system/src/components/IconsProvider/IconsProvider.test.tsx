import { render, waitFor } from '@testing-library/react';

import { Icon } from '../Icon';
import { IconsProvider } from './IconsProvider';

describe('IconsProvider injectIcon', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it.each(['1password', '-1x', 'a.b:c', 'x"] , body #y['])(
		'should inject icon with id %s without using a css selector',
		name => {
			const { container } = render(
				<>
					<IconsProvider bundles={[]} icons={{ [name]: <path d="M0 0" /> }} />
					<Icon name={name} />
				</>,
			);
			expect(container.querySelector('svg.tc-svg-icon path[d="M0 0"]')).toBeInTheDocument();
		},
	);

	it('should ignore document elements that only look like an icons provider', () => {
		const fake = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		fake.setAttribute('class', 'tc-iconsprovider');
		const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
		symbol.setAttribute('id', 'talend-trash');
		const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
		path.setAttribute('d', 'M9 9');
		symbol.appendChild(path);
		fake.appendChild(symbol);
		document.body.appendChild(fake);

		const { container } = render(
			<>
				<IconsProvider bundles={[]} icons={{ 'talend-trash': <path d="M0 0" /> }} />
				<Icon name="talend-trash" />
			</>,
		);
		expect(container.querySelector('svg.tc-svg-icon path[d="M0 0"]')).toBeInTheDocument();
		expect(container.querySelector('path[d="M9 9"]')).not.toBeInTheDocument();
		expect(IconsProvider.getCurrentIconIds()).toEqual(['talend-trash']);
	});

	it('should keep rendering the real provider when the document holds a spoofed one', () => {
		const fake = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
		fake.setAttribute('class', 'tc-iconsprovider');
		document.body.appendChild(fake);
		const warn = vi.spyOn(console, 'warn').mockImplementation(() => {});

		const { container } = render(
			<IconsProvider bundles={[]} icons={{ custom: <path d="M0 0" /> }} />,
		);
		expect(warn).not.toHaveBeenCalled();
		expect(container.querySelector('symbol#custom')).toBeInTheDocument();
		warn.mockRestore();
	});

	it('should not take icons from a remote svg declaring a provider class and a bundle id', async () => {
		global.self.fetch = vi.fn().mockResolvedValue({
			status: 200,
			ok: true,
			text: () =>
				Promise.resolve(
					'<svg xmlns="http://www.w3.org/2000/svg"><g class="tc-iconsprovider"><g id="talend-trash"><path d="M9 9"/></g></g></svg>',
				),
		});
		const { container } = render(
			<>
				<Icon name="remote-https://example.com/evil.svg" />
				<IconsProvider bundles={[]} icons={{ 'talend-trash': <path d="M0 0" /> }} />
				<Icon name="talend-trash" />
			</>,
		);
		await waitFor(() => expect(container.querySelector('path[d="M9 9"]')).toBeInTheDocument());
		const icon = container.querySelector('svg.tc-icon-name-talend-trash') as Element;
		expect(icon.querySelector('path[d="M0 0"]')).toBeInTheDocument();
		expect(icon.querySelector('path[d="M9 9"]')).not.toBeInTheDocument();
		expect(IconsProvider.getCurrentIconIds()).toEqual(['talend-trash']);
	});
});
