import React from 'react';
import { shallow } from 'enzyme';
import RichTooltip, { RichTooltipContent } from './RichTooltip.component';

const Content = <div>Content</div>;
const Header = <div>Header</div>;
const Footer = <div>Footer</div>;

describe('RichTooltip', () => {
	it('should render RichTooltip with header, content and footer', () => {
		const wrapper = shallow(<RichTooltip Header={Header} Content={Content} Footer={Footer} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with a text in the body', () => {
		const wrapper = shallow(<RichTooltip text="loreum" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('RichTooltipContent', () => {
	it('should render RichTooltipContent with a content', () => {
		const wrapper = shallow(<RichTooltipContent Content={Content} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with a text in the body', () => {
		const wrapper = shallow(<RichTooltipContent text="loreum" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
