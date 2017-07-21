import React from 'react';
import { shallow } from 'enzyme';

import Inject from '../src/Inject.component';

describe('Inject', () => {
	it('should render', () => {
		// given
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';
		const context = {
			registry: {
				'_.route.component:MyComponent': MyComponent,
			},
		};

		// when
		const wrapper = shallow(<Inject component="MyComponent" extra-props />, { context });

		// then
		expect(wrapper.equals(<MyComponent extra-props />)).toBe(true);
	});

	it('should render error if component not found', () => {
		// given
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';
		const context = { registry: {} };

		// when
		const wrapper = shallow(<Inject component="MyComponent" />, { context });

		// then
		expect(wrapper.equals(
			<Inject.NotFoundComponent
				error="component not found in the registry: MyComponent"
			/>
		)).toBe(true);
	});
});
