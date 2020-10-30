import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';
import Connected, {
	mapStateToProps,
	ContainerActionSplitDropdown,
} from './ActionSplitDropdown.connect';

describe('Connect(CMF(Container(ActionSplitDropdown)))', () => {
	it('should connect ActionSplitDropdown', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${ContainerActionSplitDropdown.displayName}))`);
		expect(Connected.WrappedComponent).toBe(ContainerActionSplitDropdown);
	});
	it('should map state to props', () => {
		const state = mock.store.state();
		const actionId = 'menu:article';
		const actionIds = ['menu:items'];
		const props = mapStateToProps(state, { actionId, actionIds });
		expect(typeof props).toBe('object');
		expect(props).toMatchObject({
			name: 'My article',
			payload: {},
			items: [{ name: 'my items' }],
		});
	});
});

describe('Container(ActionSplitDropdown)', () => {
	it('should render', () => {
		const context = mock.store.context();
		const wrapper = shallow(
			<ContainerActionSplitDropdown
				foo="extra"
				items={[{ foo: 'bar', actionCreator: 'menu:item' }]}
				actionCreator="split"
			/>,
			{ context },
		);
		expect(wrapper.getElement()).toMatchSnapshot();
		const props = wrapper.props();
		expect(typeof props.items[0].onClick).toBe('function');
	});
});
