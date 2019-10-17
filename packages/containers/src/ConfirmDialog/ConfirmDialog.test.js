import React from 'react';
import renderer from 'react-test-renderer';
import { fromJS, Map } from 'immutable';
import mock, { store, Provider } from '@talend/react-cmf/lib/mock';

import Container from './ConfirmDialog.container';
import Connected, { mapStateToProps } from './ConfirmDialog.connect';

import { showConfirmDialog, hideConfirmDialog } from './showHideConfirmDialog';

jest.mock('@talend/react-components/lib/ConfirmDialog', () => props => (
	<div className="tc-confirm-dialog" {...props} />
));

describe('Container ConfirmDialog', () => {
	it('should not render', () => {
		const state = new Map({
			size: 'small',
			header: 'DO SOMETHING',
			show: true,
			children: 'Confirm this !',
		});
		const instance = new Container({ state });
		expect(instance.render()).toBe(null);
	});
	it('should render', () => {
		const state = new Map({
			size: 'small',
			header: 'DO SOMETHING',
			show: true,
			children: 'Confirm this !',
			validateAction: 'menu:demo',
			cancelAction: 'menu:demo',
			model: { foo: 'bar' },
		});
		const wrapper = renderer
			.create(
				<Provider>
					<Container state={state} />,
				</Provider>,
			)
			.toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});

describe('Connected ConfirmDialog', () => {
	it('should connect ConfirmDialog', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Container.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Container);
	});

	it('should set validateAction and cancelAction', () => {
		const cmfState = new Map({
			size: 'small',
			header: 'DO SOMETHING',
			show: true,
			children: 'Confirm this !',
			validateAction: 'object:validate',
			cancelAction: 'object:cancel',
		});
		const state = mock.state();
		state.cmf.settings.actions['object:validate'] = { name: 'foo' };
		state.cmf.settings.actions['object:cancel'] = { name: 'foo1' };

		const props = mapStateToProps(state, { oneProp: 'a prop' }, { state: cmfState });
		expect(props.validateAction.name).toEqual('foo');
		expect(props.cancelAction.name).toEqual('foo1');
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
		const confirmDialoVisibility = newState.cmf.components.getIn([
			'CMFContainer(ConfirmDialog)',
			'ConfirmDialog',
			'show',
		]);
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
		const confirmDialogVisibility = newState.cmf.components.getIn([
			'CMFContainer(ConfirmDialog)',
			'ConfirmDialog',
			'show',
		]);
		expect(confirmDialogVisibility).toBeFalsy();
	});
});
