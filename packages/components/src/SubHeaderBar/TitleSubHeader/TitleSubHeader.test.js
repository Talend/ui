import React from 'react';
import { shallow } from 'enzyme';
import { Label } from 'react-bootstrap';
import Skeleton from '../../Skeleton';
import Icon from '../../Icon';
import Action from '../../Actions/Action';
import EditableText from '../../EditableText';
import TitleSubHeader, { SubTitle } from './TitleSubHeader.component';

describe('TitleSubHeader', () => {
	let defaultProps;
	beforeEach(
		() =>
			(defaultProps = {
				title: 'myTitle',
				onEdit: jest.fn(),
				onSubmit: jest.fn(),
			}),
	);
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
			'tc-subheader-details theme-tc-subheader-details tc-subheader-details-blink theme-tc-subheader-details-blink',
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
				subTitleAs={({ subTitle }) => <Label className="label-info">{subTitle}</Label>}
			/>,
		);
		expect(wrapper.find(Label)).not.toBe(null);
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
