import React from 'react';
import { shallow } from 'enzyme';
import ArrayField from './ArrayField';

describe('ArrayField', () => {
	it('should render hidden array', () => {
		const schema = {
			type: 'array',
			items: {
				type: 'string',
			},
		};
		const uiSchema = { 'ui:widget': 'hidden' };
		const wrapper = shallow(
			<ArrayField schema={schema} uiSchema={uiSchema} onChange={jest.fn()} />,
		);
		expect(wrapper.getElement()).toBe(null);
	});
});
