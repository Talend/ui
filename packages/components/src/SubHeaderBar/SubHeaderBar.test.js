import React from 'react';
import { shallow } from 'enzyme';
import { Icon, Action, ActionBar } from '../index';
import SubHeaderBar, {
	SubHeaderBarActions,
	EditTitle,
	DetailsTitle,
	DetailsIcon,
	getComponentFromType,
} from './SubHeaderBar.component';

describe('getComponentFromType', () => {
	it('should return a component', () => {
		expect(getComponentFromType({ component: <Icon name="talend-pencil" /> })).toEqual(
			<Icon name="talend-pencil" />,
		);
	});
	it('should return an Action component', () => {
		expect(getComponentFromType({ renderType: 'action' })).toEqual(<Action />);
	});
	it('should return null when no parameters', () => {
		expect(getComponentFromType()).toEqual(null);
	});
	it('should return null when no component or renderType found ', () => {
		expect(getComponentFromType({ renderType: '', component: '' })).toEqual(null);
	});
});

describe('DetailsIcon', () => {
	it('should render', () => {
		const wrapper = shallow(<DetailsIcon iconFile="talend-pencil" />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('DetailsTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<DetailsTitle
				title="myTitle"
				subTitle="mySubTitle"
				iconFile="talend-pencil"
				onEdit={jest.fn()}
			/>,
		);
		expect(wrapper.find(DetailsIcon)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should not render a DetailsIcon', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" />);
		expect(wrapper.find(DetailsIcon)).toHaveLength(0);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with title', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" />);
		expect(wrapper.text()).toBe('myTitle');
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with subTitle', () => {
		const wrapper = shallow(<DetailsTitle title="myTitle" subTitle="mySubTitle" />);
		expect(wrapper.text()).toBe('myTitlemySubTitle');
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render an Action', () => {
		const actionProps = {
			name: 'action-edit-title',
			label: 'edit',
			icon: 'talend-pencil',
			onClick: jest.fn(),
			bsStyle: 'link',
			className: undefined,
			hideLabel: true,
		};
		const wrapper = shallow(<DetailsTitle title="myTitle" onEdit={actionProps.onClick} />);
		expect(wrapper.find(Action)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

describe('EditTitle', () => {
	it('should render', () => {
		const wrapper = shallow(
			<EditTitle
				title="myTitle"
				iconFile="talend-pencil"
				inputTextValue="value"
				onSubmit={jest.fn()}
				onCancel={jest.fn()}
				onChange={jest.fn()}
			/>,
		);
		expect(wrapper.find(DetailsIcon)).toHaveLength(1);
		expect(wrapper.find('input')).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render not DetailsIcon', () => {
		const wrapper = shallow(<EditTitle title="myTitle" />);
		expect(wrapper.find(DetailsIcon)).toHaveLength(0);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

let actions = [];
describe('SubHeaderBarActions', () => {
	beforeEach(() => {
		actions = [
			{
				id: 'action1',
				label: 'action1',
				renderType: 'action',
				bsStyle: 'link',
				icon: 'talend-share-alt',
				onClick: jest.fn(),
				hideLabel: true,
			},
			{
				id: 'action2',
				label: 'action2',
				renderType: 'action',
				bsStyle: 'link',
				icon: 'talend-activity',
				onClick: jest.fn(),
				hideLabel: true,
			},
			{
				id: 'action3',
				component: <Icon name="talend-bell" />,
			},
		];
	});
	it('should render with center props', () => {
		const props = {
			center: false,
			right: true,
			className: 'myClassName',
			actions,
		};
		const wrapper = shallow(<SubHeaderBarActions {...props} />);
		expect(wrapper.find(Icon)).toHaveLength(1);
		expect(wrapper.find(Action)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with right props', () => {
		const props = {
			center: true,
			right: false,
			className: 'myClassName',
			actions,
		};
		const wrapper = shallow(<SubHeaderBarActions {...props} />);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});

let actionsRight = [];
let actionsCenter = [];
describe('SubHeaderBar', () => {
	beforeEach(() => {
		actionsRight = [
			{
				id: 'action1',
				label: 'action1',
				renderType: 'action',
				bsStyle: 'link',
				icon: 'talend-share-alt',
				onClick: jest.fn(),
				hideLabel: true,
			},
			{
				id: 'action2',
				label: 'action2',
				renderType: 'action',
				bsStyle: 'link',
				icon: 'talend-activity',
				onClick: jest.fn(),
				hideLabel: true,
			},
		];
		actionsCenter = [
			{
				id: 'action3',
				label: 'action3',
				renderType: 'action',
				bsStyle: 'link',
				icon: 'talend-activity',
				onClick: jest.fn(),
				hideLabel: true,
			},
		];
	});
	it('should render with 2 SubHeaderBarActions', () => {
		const props = {
			title: 'myTitle',
			actionsCenter,
			actionsRight,
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(2);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render one SubHeaderBarActions (right)', () => {
		const props = {
			title: 'myTitle',
			actionsRight,
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with SubHeaderBarActions (center)', () => {
		const props = {
			title: 'myTitle',
			actionsCenter,
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(SubHeaderBarActions)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with no SubHeaderBarActions', () => {
		const props = {
			title: 'myTitle',
			editMode: false,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(ActionBar.Content)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
	it('should render with EditTitle', () => {
		const props = {
			title: 'myTitle',
			editMode: true,
			onGoBack: jest.fn(),
		};
		const wrapper = shallow(<SubHeaderBar {...props} />);
		expect(wrapper.find(EditTitle)).toHaveLength(1);
		expect(wrapper.getNode()).toMatchSnapshot();
	});
});
