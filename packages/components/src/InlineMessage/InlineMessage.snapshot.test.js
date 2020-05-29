import React from 'react';
import renderer from 'react-test-renderer';

import { InlineMessage } from './InlineMessage.component';

jest.mock('react-dom');

const currentProps = {
	type: 'success',
	title: 'Validation title.',
	description: 'Validation and successful messages',
	icon: 'talend-check-circle',
};

describe('InlineMessage', () => {
	it('should render with icon, title and description', () => {
		// when
		const wrapper = renderer.create(<InlineMessage {...currentProps} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with title and description', () => {
		// given
		const props = {
			...currentProps,
			icon: '',
		};

		// when
		const wrapper = renderer.create(<InlineMessage {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with icon and description', () => {
		// given
		const props = {
			...currentProps,
			title: '',
		};
		// when
		const wrapper = renderer.create(<InlineMessage {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with icon, title, description and link', () => {
		// given
		const props = {
			...currentProps,
			link: {
				href: 'https://my.custom.link',
				label: 'See more',
			},
		};
		// when
		const wrapper = renderer.create(<InlineMessage {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with higligthed background', () => {
		// given
		const props = {
			...currentProps,
			withBackground: true,
		};
		// when
		const wrapper = renderer.create(<InlineMessage {...props} />).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
