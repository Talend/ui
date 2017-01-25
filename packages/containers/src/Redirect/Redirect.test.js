import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import Redirect from './Redirect.component';

jest.mock('react-dom');

describe('Redirect', () => {
	it('should redirect to path', () => {
		const wrapper = renderer.create(
			<Provider>
				<Redirect path="/hello-world" />
			</Provider>
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
