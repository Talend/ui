import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Container, { DEFAULT_STATE } from './Notification.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './Notification.connect';

describe('Container Notification', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container />
			</Provider>,
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected Notification', () => {
	it('should connect Notification', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					Notification: {
						Notification: DEFAULT_STATE.toJS(),
					},
				}),
			},
		};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		const dispatch = () => {};
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});

