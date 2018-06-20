import React from 'react';
import { shallow } from 'enzyme';

import CMFStory from './CMFStory.component';

describe('CMFStory', () => {
	it('should render its name', () => {
		const wrapper = shallow(
			<CMFStory name="Hello world">
				<div>My Story</div>
			</CMFStory>,
		);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
