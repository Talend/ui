import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import Component from './<%= props.name %>.component';
import Container, { DEFAULT_STATE } from './<%= props.name %>.container';
import Connected, {
	mapStateToProps,
} from './<%= props.name %>.connect';

describe('Component <%= props.name %>', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Component />
		).toJSON();
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Container <%= props.name %>', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
});

describe('Connected <%= props.name %>', () => {
	it('should connect <%= props.name %>', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should mapStateToProps', () => {
		const state = {
			cmf: {
				components: new Map({
					<%= props.name %>: {
						<%= props.name %>: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});

