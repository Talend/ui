import React from 'react';
import { shallow } from 'enzyme';
import RichTooltip, {
	RichTooltipContent,
	RichTooltipHeader,
	RichTooltipFooter,
} from './RichTooltip.component';

const Content = <div>Content</div>;
const error = { title: 'Whoops!', message: 'One error' };

describe('RichTooltip', () => {
	it('should render RichTooltip with header, content and footer', () => {
		const header = <RichTooltipHeader title="my title" right={[{ id: 42 }]} />;
		const footer = <RichTooltipFooter right={[{ id: 42 }]} left={[{ id: 41 }]} />;
		const wrapper = shallow(<RichTooltip header={header} content={Content} footer={footer} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should pass the props loading and error to the RichTooltipContent', () => {
		const wrapper = shallow(<RichTooltip error={error} loading />);

		const richTooltipContentProps = wrapper.find(RichTooltipContent).props();
		expect(richTooltipContentProps.error).toBe(error);
		expect(richTooltipContentProps.loading).toBe(true);
	});
});

describe('RichTooltipContent', () => {
	it('should render RichTooltipContent with an error', () => {
		const wrapper = shallow(<RichTooltipContent error={error} Content="body" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render RichTooltipContent with a loading', () => {
		const wrapper = shallow(<RichTooltipContent loading Content="body" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render RichTooltipContent with a string', () => {
		const wrapper = shallow(<RichTooltipContent Content="body" />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render RichTooltipContent with a custom component', () => {
		const wrapper = shallow(<RichTooltipContent Content={Content} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('RichTooltipHeader', () => {
	it('should render RichTooltipHeader', () => {
		const wrapper = shallow(<RichTooltipHeader title="my title" right={[{ id: 42 }]} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('RichTooltipFooter', () => {
	it('should render RichTooltipFooter', () => {
		const wrapper = shallow(<RichTooltipFooter right={[{ id: 41 }]} left={[{ id: 42 }]} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
