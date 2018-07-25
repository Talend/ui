import React from 'react';
import renderer from 'react-test-renderer';

import HttpError from './HttpError.component';

const forbiddenProps = {
	status: 403,
	title: 'Access denied',
	message: 'You are not allowed to access this page',
};

const notFoundProps = {
	status: 404,
	title: 'Oops...',
	message: 'The page you are looking for cannot be found',
	action: {
		onClick: jest.fn(),
		label: 'Start over',
	},
};

describe('HttpError', () => {
	it('should render a forbidden http error message', () => {
		// when
		const wrapper = renderer.create(<HttpError {...forbiddenProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render a notFound http error page with action', () => {
		// when
		const wrapper = renderer.create(<HttpError {...notFoundProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
