import React from 'react';
import { shallow } from 'enzyme';
import { Skeleton, Icon, Action, EditableText } from '../../';
import TitleSubHeader from './TitleSubHeader.component';

describe('TitleSubHeader', () => {
	let defaultProps;
	beforeEach(() =>
		(defaultProps = {
			title: 'myTitle',
			onEdit: jest.fn(),
			onSubmit: jest.fn(),
		}));
	it('should render', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render Icon', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Icon).get(0).props.name).toEqual('myIconId');
	});
	it('should not render Icon', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} />);
		expect(wrapper.find(Icon)).toHaveLength(0);
	});
	it('should render plain text title', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} editable={false} />);
		expect(wrapper.find(TitleSubHeader)).toHaveLength(0);
		expect(wrapper.find('h1')).toHaveLength(1);
	});
	it('should render EditableText', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} editable />);
		expect(wrapper.find(EditableText)).toHaveLength(1);
		expect(wrapper.find(EditableText).get(0).props.feature).toBe('subheaderbar.rename');
		expect(wrapper.find('h1')).toHaveLength(0);
	});
	it('should render skeleton', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} loading />);
		expect(wrapper.find(Skeleton)).toHaveLength(1);
	});
	it('should render inProgress', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} inProgress />);
		expect(wrapper.props().className).toEqual(
			'theme-tc-subheader-details tc-subheader-details theme-tc-subheader-details-blink tc-subheader-details-blink',
		);
	});
});

describe('TitleSubHeader', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			title: 'myTitle',
			onEdit: jest.fn(),
		};
	});
	it('should render', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} subTitle="mySubTitle" />);
		expect(wrapper.find(Action)).toHaveLength(0);
		expect(wrapper.find('h1')).toHaveLength(1);
		expect(wrapper.find('button')).toHaveLength(0);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render with title', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} />);
		expect(wrapper.find('h1').getElement().props.children).toEqual('myTitle');
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} subTitle="mySubTitle" />).find(
			'small',
		);
		expect(wrapper.getElement().props.className).toEqual(
			'theme-tc-subheader-details-text-subtitle tc-subheader-details-text-subtitle',
		);
		expect(wrapper.getElement().props.children).toEqual('mySubTitle');
	});
});
