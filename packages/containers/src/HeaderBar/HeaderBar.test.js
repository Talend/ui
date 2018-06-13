import React from 'react';
import { shallow } from 'enzyme';
import { Provider } from '@talend/react-cmf/lib/mock';
import { Map } from 'immutable';

import Container, { DEFAULT_STATE } from './HeaderBar.container';
import Connected, {
	mapStateToProps,
} from './HeaderBar.connect';

describe('Container HeaderBar', () => {
	it('should render', () => {
		const wrapper = shallow(
			<Container />
		);
		expect(wrapper.props()).toMatchSnapshot();
	});
});

describe('Connected HeaderBar', () => {
	it('should connect HeaderBar', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should mapStateToProps', () => {
		const state = {
			cmf: {
				components: new Map({
					HeaderBar: {
						HeaderBar: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});

