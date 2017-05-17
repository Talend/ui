import React from 'react';
import renderer from 'react-test-renderer';

import HttpError from './HttpError.component';

const forbiddenProps = {
	status: 403,
	title: 'Access denied',
	message: 'You are not allowed to access this page',
};

describe('HttpError', () => {
	it('should render a forbidden http error message', () => {
		// when
		const wrapper = renderer.create(<HttpError {...forbiddenProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
