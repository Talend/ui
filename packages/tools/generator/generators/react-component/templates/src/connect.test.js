import React from 'react';
import mock, { Provider } from '@talend/react-cmf/lib/mock';
import { mount } from 'enzyme';

import <%= props.name %> from '<%= props.toConnect %>';
import Connected from './<%= props.name %>.connect';

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${<%= props.name %>.displayName}))`);
		expect(Connected.WrappedComponent).toBe(<%= props.name %>);
	});
	it('should render <%= props.name %> with props', () => {
		const wrapper = mount((
			<Provider state={mock.state()}>
				<Connected />
			</Provider>
		));
		expect(wrapper.find(<%= props.name %>).get(0)).toMatchSnapshot();
	});
});
