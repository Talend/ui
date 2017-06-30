import React, { PropTypes } from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';

import getHeaderRenderer from './HeaderRenderer.component';

function DefaultHeaderRenderer(props) {
	return (<div>{props.label}</div>);
}

DefaultHeaderRenderer.propTypes = PropTypes.string;


describe('getHeaderRenderer', () => {
	it('should render the default header renderer if the header is not hidden', () => {
		const HeaderRenderer = getHeaderRenderer(DefaultHeaderRenderer, false);
		const wrapper = shallow(<HeaderRenderer label="Title" />);

		expect(toJson(wrapper)).toMatchSnapshot();
	});

	it('should render the custom header renderer if the header is hidden', () => {
		const HeaderRenderer = getHeaderRenderer(DefaultHeaderRenderer, true);
		const wrapper = shallow(<HeaderRenderer label="Title" />);

		expect(toJson(wrapper)).toMatchSnapshot();
	});
});
