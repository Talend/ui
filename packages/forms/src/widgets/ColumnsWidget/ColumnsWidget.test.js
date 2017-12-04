import React from 'react';
import { shallow } from 'enzyme';

import ColumnsWidget from './ColumnsWidget';

import testSchema from '../../../stories/json/columns.json';

describe('ColumnsWidget', () => {
	it('should render', () => {
		const noop = () => {};
		const wrapper = shallow(
			<ColumnsWidget
				schema={testSchema.jsonSchema}
				formData={{}}
				onChange={noop}
				onBlur={noop}
			/>
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
