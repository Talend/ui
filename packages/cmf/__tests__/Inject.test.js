import React from 'react';
import { render } from '@testing-library/react';

import Inject from '../src/Inject.component';
import { mock } from '../src';

describe('Inject', () => {
	it('should render', () => {
		// given
		const MyComponent = jest.fn(props => <span {...props}>Hello</span>);
		MyComponent.displayName = 'MyComponent';
		const registry = {
			'_.route.component:MyComponent': MyComponent,
		};

		// when
		const wrapper = render(
			<mock.Provider registry={registry}>
				<Inject component="MyComponent" data-testid="foo" />
			</mock.Provider>,
		);

		// then
		const out = wrapper.container.querySelector('[data-test="foo"]');
		expect(out).toBeDefined();
		expect(out.nodeName).toBe('SPAN');
	});

	it('should render error if component not found', () => {
		// given
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';

		// when
		const wrapper = render(
			<mock.Provider>
				<Inject component="MyComponent" />
			</mock.Provider>,
		);

		// then
		expect(screen.getByText(
			'component not found in the registry: MyComponent',
		)).toBeTruthy();
	});
});
