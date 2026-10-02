import { render } from '@testing-library/react';

import { Icon } from '../Icon';

describe('IconsProvider injectIcon', () => {
	afterEach(() => {
		document.body.innerHTML = '';
	});

	it.each(['1password', '-1x', 'a.b:c', 'x"] , body #y['])(
		'should inject icon with id %s without using a css selector',
		name => {
			const provider = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
			provider.setAttribute('class', 'tc-iconsprovider');
			const symbol = document.createElementNS('http://www.w3.org/2000/svg', 'symbol');
			symbol.setAttribute('id', name);
			const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
			path.setAttribute('d', 'M0 0');
			symbol.appendChild(path);
			provider.appendChild(symbol);
			document.body.appendChild(provider);

			let container!: HTMLElement;
			expect(() => {
				({ container } = render(<Icon name={name} />));
			}).not.toThrow();
			expect(container.querySelector('svg path[d="M0 0"]')).toBeInTheDocument();
		},
	);
});
