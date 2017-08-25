import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';

import Actions from './Actions.component';

describe('Actions', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Actions actions={['menu:demo']} />
			</Provider>).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
