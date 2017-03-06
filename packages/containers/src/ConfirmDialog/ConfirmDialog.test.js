import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS, Map } from 'immutable';
import { store, Provider } from 'react-cmf/lib/mock';

import Container, { DEFAULT_STATE } from './ConfirmDialog.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './ConfirmDialog.connect';

import { showConfirmDialog, hideConfirmDialog } from './showHideConfirmDialog';

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

describe('ConfirmDialog.show/hide', () => {
	it('should change the visibility to true in the state', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			ConfirmDialog: {
				ConfirmDialog: {
					show: false,
				},
			},
		});

		const dialog = new Map({
			size: 'small',
			header: 'REMOVE SEMANTIC TYPE',
			children: 'Are you sure you want to remove the semantic type ?',
			model: {},
			// these two actions are contained in show:remove:semantic action payload
			validateAction: '',
			cancelAction: '',
		});

		const action = {
			confirmDialogConf: dialog,
			model: {},
		};

		const newState = showConfirmDialog(state, action);
		expect(newState).not.toBe(state);
		const confirmDialoVisibility = newState.cmf.components.getIn(['ConfirmDialog', 'ConfirmDialog', 'show']);
		expect(confirmDialoVisibility).toBeTruthy();
	});

	it('should change the visibility to false in the state', () => {
		const state = store.state();
		state.cmf.components = fromJS({
			ConfirmDialog: {
				ConfirmDialog: {
					show: true,
				},
			},
		});

		const newState = hideConfirmDialog(state);
		expect(newState).not.toBe(state);
		const confirmDialogVisibility = newState.cmf.components.getIn(['ConfirmDialog', 'ConfirmDialog', 'show']);
		expect(confirmDialogVisibility).toBeFalsy();
	});
});

