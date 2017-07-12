import React from 'react';
import { shallow } from 'enzyme';

import Inject from './Inject.component';

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
});
