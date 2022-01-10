import React from 'react';
import { mount } from 'enzyme';

import Inject from '../src/Inject.component';
import { mock } from '../src';

describe('Inject', () => {
	it('should render', () => {
		// given
		const MyComponent = jest.fn(() => <span>Hello</span>);
		MyComponent.displayName = 'MyComponent';
		const context = {
			registry: {
				'_.route.component:MyComponent': MyComponent,
			},
		};
		const Provider = mock.Provider;

		// when
		const wrapper = mount(
			<Inject component="MyComponent" extra-props />,
			Provider.getEnzymeOption(context),
		);

		// then
		expect(wrapper.find(MyComponent).equals(<MyComponent extra-props />)).toBe(true);
	});

	it('should render error if component not found', () => {
		// given
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';
		// const context = { registry: {} };
		const Provider = mock.Provider;

		// when
		const wrapper = mount(<Inject component="MyComponent" />, Provider.getEnzymeOption());

		// then
		expect(
			wrapper
				.find(Inject.NotFoundComponent)
				.equals(
					<Inject.NotFoundComponent error="component not found in the registry: MyComponent" />,
				),
		).toBe(true);
	});
});
