import React from 'react';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Container, { DEFAULT_STATE } from './ConfirmDialog.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './ConfirmDialog.connect';

const initialState = new Map({
	size: 'small',
	header: 'DO SOMETHING',
	show: true,
	children: 'Confirm this !',
});

describe('Container ConfirmDialog', () => {
	it('should not render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container initialState={initialState} />
			</Provider>,
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
	it('should render', () => {
		const state = new Map({
			size: 'small',
			header: 'DO SOMETHING',
			show: true,
			children: 'Confirm this !',
			validateAction: 'menu:demo',
			cancelAction: 'menu:demo',
		});
		const wrapper = renderer.create(
			<Provider>
				<Container state={state} />
			</Provider>,
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected ConfirmDialog', () => {
	it('should connect ConfirmDialog', () => {
		expect(Connected.displayName).toBe(`Connect(${Container.displayName})`);
		expect(Connected.WrappedComponent).toBe(Container);
	});
	it('should map state to props', () => {
		const state = {
			cmf: {
				components: new Map({
					ConfirmDialog: {
						ConfirmDialog: DEFAULT_STATE.toJS(),
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

