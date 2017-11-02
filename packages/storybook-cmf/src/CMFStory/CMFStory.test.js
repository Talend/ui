import React from 'react';
import renderer from 'react-test-renderer';

import CMFStory from './CMFStory.component';

describe('CMFStory', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<CMFStory name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
