import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';

import Action from './Action.component';

jest.mock('react-talend-components');
jest.mock('react-dom');

describe('Action', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(
			<Provider>
				<Action name="menu:article" />
			</Provider>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
