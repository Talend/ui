import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';
import { Provider } from 'react-cmf/lib/mock';
import { Map } from 'immutable';

import Container, { DEFAULT_STATE } from './ConfirmDialog.container';
import Connected, {
	mapDispatchToProps,
	mapStateToProps,
} from './ConfirmDialog.connect';

const actionsProps = {
	actions : {
		cancelRemoveSmType: 'object:cancel:remove:semantic',
		removeSmType: 'object:remove:semantic',
	},
};

const initialState = new Map({
	size: 'small',
	header: 'DO SOMETHING',
	show: true,
	children: 'Confirm this !',
	validateAction: {
		label: 'Ok',
		bsStyle: 'primary',
	},
	cancelAction: {
		label: 'No !',
	},
});

describe('Container ConfirmDialog', () => {
	it('should render', () => {
		const wrapper = renderer.create(
			<Provider>
				<Container initialState={initialState} />
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

