import React from 'react';
import { shallow, mount } from 'enzyme';
import Skeleton from '../../Skeleton';
import Icon from '../../Icon';
import Action from '../../Actions/Action';
import Tag from '../../Tag';
import EditableText from '../../EditableText';
import TitleSubHeader, { SubTitle } from './TitleSubHeader.component';

describe('TitleSubHeader', () => {
	let defaultProps;

	beforeEach(() => {
		defaultProps = {
			title: 'myTitle',
			onEdit: jest.fn(),
			onSubmit: jest.fn(),
		};
	});

	it('should render', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} />);
		expect(wrapper.find(Action)).toHaveLength(0);
		expect(wrapper.find('h1')).toHaveLength(1);
		expect(wrapper.find('button')).toHaveLength(0);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with title', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} />);
		expect(wrapper.find('h1').getElement().props.children).toEqual('myTitle');
	});

	it('should render with an icon', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} iconId="myIconId" />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Icon).get(0).props.name).toEqual('myIconId');
		expect(wrapper.getElement()).toMatchSnapshot();
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
			'tc-subheader-details theme-tc-subheader-details tc-subheader-details-blink theme-tc-subheader-details-blink',
		);
	});

	it('should go in edit mode', () => {
		const wrapper = shallow(<TitleSubHeader {...defaultProps} editable />);
		const findEditableText = () => wrapper.find('[feature="subheaderbar.rename"]');

		findEditableText().props().onEdit();

		expect(findEditableText().props().editMode).toEqual(true);

		findEditableText().props().onCancel();

		expect(findEditableText().props().editMode).toEqual(false);
	});

	it('should render pass extra props to the title', () => {
		// given
		const titleProps = { 'data-test': '123' };

		// when
		const wrapper = shallow(<TitleSubHeader {...defaultProps} titleProps={titleProps} />);

		// then
		expect(wrapper.find('[data-test="123"]')).toHaveLength(1);
	});
});

describe('SubTitle', () => {
	let defaultProps;
	beforeEach(() => {
		defaultProps = {
			subTitle: 'mySubTitle',
		};
	});

	it('should render', () => {
		const wrapper = shallow(<SubTitle {...defaultProps} />);
		expect(wrapper.html()).toMatchSnapshot();
	});

	it('should render in loading mode', () => {
		const wrapper = shallow(<SubTitle subTitleLoading />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render with a custom subtitle', () => {
		const wrapper = shallow(
			<SubTitle
				{...defaultProps}
				subTitleAs={({ subTitle }) => <Tag bsStyle="info">{subTitle}</Tag>}
			/>,
		);
		expect(wrapper.find(Tag)).not.toBe(null);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render pass extra props to the subtitle', () => {
		// given
		const subTitleProps = { 'data-test': '345' };

		// when
		const wrapper = mount(<SubTitle {...defaultProps} subTitleProps={subTitleProps} />);

		// then
		expect(wrapper.find(('[data-test="345"]'))).toHaveLength(1);
	});
});
