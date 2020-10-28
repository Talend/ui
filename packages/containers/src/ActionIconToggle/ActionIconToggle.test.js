import React from 'react';
import { shallow } from 'enzyme';
import { mock } from '@talend/react-cmf';

import { ContainerActionIconToggle, mapStateToProps, mergeProps } from './ActionIconToggle.connect';

const state = {
	cmf: {
		settings: {
			actions: {
				'my-awesome-action-from-pure-settings': {
					className: 'my-awesome-classname',
					icon: 'talend-awesome-icon',
					id: 'my-awesome-action-id',
					label: 'My awesome label',
					tooltipPlacement: 'top',
					activeExpression: 'is-my-awesome-action-active',
					payload: {
						type: 'TOGGLE-MY-AWESOME-ACTION',
					},
				},
			},
		},
	},
};

describe('Action Icon Toggle', () => {
	it('should render', () => {
		// given
		const context = mock.store.context();

		// when
		const wrapper = shallow(
			<ContainerActionIconToggle
				className="my-awesome-classname"
				icon="talend-awesome-icon"
				id="my-awesome-action-id"
				label="My awesome label"
				tooltipPlacement="top"
				payload={{ type: 'TOGGLE-MY-AWESOME-ACTION' }}
				active
			/>,
			{ context },
		);

		// then
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should dispatch on click', () => {
		// given
		const context = mock.store.context();
		const dispatch = jest.fn();
		const payload = { type: 'TOGGLE-MY-AWESOME-ACTION' };

		const wrapper = shallow(
			<ContainerActionIconToggle
				className="my-awesome-classname"
				icon="talend-awesome-icon"
				id="my-awesome-action-id"
				label="My awesome label"
				tooltipPlacement="top"
				payload={payload}
				active
				dispatch={dispatch}
			/>,
			{ context },
		);

		// when
		wrapper.simulate('click');

		// then
		expect(dispatch).toBeCalledWith(payload);
	});

	it('#mapStateToProps should resolve action props from actionIf', () => {
		// when
		const props = mapStateToProps(state, { actionId: 'my-awesome-action-from-pure-settings' });

		// then
		expect(props).toEqual(state.cmf.settings.actions['my-awesome-action-from-pure-settings']);
	});

	it('#mergeProps should remove actionId', () => {
		// given
		const stateProps = { toto: 'lol', actionId: 'my-action' };
		const dispatchProps = {};
		const ownProps = {};

		// when
		const props = mergeProps(stateProps, dispatchProps, ownProps);

		// then
		expect(props).toEqual({ toto: 'lol' });
	});
});
