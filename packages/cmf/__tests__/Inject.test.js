import React from 'react';
import { shallow } from 'enzyme';

import Inject from '../src/Inject.component';

describe('Inject', () => {
	it('should render', () => {
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';
		const context = {
			registry: {
				'_.route.component:MyComponent': MyComponent,
			},
		};
		const wrapper = shallow(
			<Inject component="MyComponent" extra-props />
		, { context });
		expect(wrapper.equals(<MyComponent extra-props />)).toBe(true);
	});
	it('should render error if component not found', () => {
		const MyComponent = jest.fn();
		MyComponent.displayName = 'MyComponent';
		const context = { registry: {} };
		const wrapper = shallow(
			<Inject component="MyComponent" extra-props />
		, { context });
		expect(wrapper.equals(
			<Inject.NotFoundComponent
				extra-props
				error="component not found in the registry: MyComponent"
			/>
		)).toBe(true);
	});
});
