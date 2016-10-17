import React from 'react';
import renderer from 'react-test-renderer';

import DisplayTile from './DisplayTile.component';

describe('DisplayTile', () => {
	it('should render its name', () => {
		const wrapper = renderer.create(<DisplayTile name="Hello world" />).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
