import React from 'react';
import { shallow } from 'enzyme';

import FilterWidget from './FilterWidget';

import testSchema from '../../../stories/json/filter.json';


describe('FilterWidget', () => {
	it('should render', () => {
		const noop = () => {};
		const wrapper = shallow(
			<FilterWidget
				schema={testSchema.jsonSchema}
				formData={{}}
				onChange={noop}
				onBlur={noop}
			/>
		);
		expect(wrapper.node).toMatchSnapshot();
	});
});
