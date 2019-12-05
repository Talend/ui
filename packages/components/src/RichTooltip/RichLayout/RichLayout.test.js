import React from 'react';
import { shallow } from 'enzyme';
import RichLayout from './RichLayout.component';

const Content = <div>Content</div>;
const Header = <div>Header</div>;
const Footer = <div>Footer</div>;

describe('RichLayout', () => {
	it('should render RichLayout with header, content and footer', () => {
		const wrapper = shallow(
			<RichLayout id="richlayout" Header={Header} Content={Content} Footer={Footer} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with a text in the body', () => {
		const wrapper = shallow(<RichLayout id="richlayout" text="loreum" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
