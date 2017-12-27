import React from 'react';
import { mount } from 'enzyme';
import { Provider } from '@talend/react-cmf/lib/mock';
import { HeaderBar } from '@talend/react-components';

import Container from './HeaderBar.component';

describe('Container HeaderBar', () => {
	it('should pass props to component HeaderBar', () => {
		const wrapper = mount(
			<Provider>
				<Container />
			</Provider>,
		);
		expect(wrapper.find(HeaderBar).props()).toMatchSnapshot();
	});
});
