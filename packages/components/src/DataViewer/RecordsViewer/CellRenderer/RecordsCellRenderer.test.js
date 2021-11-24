import React from 'react';
import { shallow } from 'enzyme';
import Component from './RecordsCellRenderer.component';

describe('RecordsCellRenderer', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component index={0} value={[{ data: 'myData' }]} measure={jest.fn()} />,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
