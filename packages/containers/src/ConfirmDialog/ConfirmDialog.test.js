/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { fromJS, Map } from 'immutable';
import cmf, { mock } from '@talend/react-cmf';
import { render } from '@testing-library/react';

import Container from './ConfirmDialog.container';
import Connected, { mapStateToProps } from './ConfirmDialog.connect';

import { showConfirmDialog, hideConfirmDialog } from './showHideConfirmDialog';

jest.mock(
	'@talend/react-components/lib/ConfirmDialog',
	() =>
		({ cancelAction, validateAction, show, ...props }) =>
			(
				<div
					data-testid="ConfirmDialog"
					className="tc-confirm-dialog"
					{...props}
					aria-hidden={(!show).toString()}
				>
					<button data-testid="cancelAction" onClick={cancelAction.onClick}>
						cancelAction.label
					</button>
					<button data-testid="validateAction" onClick={validateAction.onClick}>
						validateAction.label
					</button>
				</div>
			),
);
jest.unmock('@talend/design-system');

describe('Container ConfirmDialog', () => {
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should not render', () => {
		const state = new Map({
			size: 'small',
			header: 'DO SOMETHING',
			show: true,
			children: 'Confirm this !',
		});
		const { container } = render(
			<App {...mock.store.context()}>
				<Container state={state} />
			</App>,
		);
		expect(container).toBeEmptyDOMElement();
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
		const { container } = render(
			<App {...mock.store.context()}>
				<Container state={state} />
			</App>,
		);

		expect(container.firstChild).toMatchSnapshot();
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
		const state = mock.store.state();
		state.cmf.settings.actions['object:validate'] = { name: 'foo' };
		state.cmf.settings.actions['object:cancel'] = { name: 'foo1' };

		const props = mapStateToProps(state, { oneProp: 'a prop' }, { state: cmfState });
		expect(props.validateAction.name).toEqual('foo');
		expect(props.cancelAction.name).toEqual('foo1');
	});
});

describe('ConfirmDialog.show/hide', () => {
	it('should change the visibility to true in the state', () => {
		const state = mock.store.state();
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
		const state = mock.store.state();
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
