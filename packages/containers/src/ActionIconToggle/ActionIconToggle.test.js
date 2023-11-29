import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import cmf, { mock } from '@talend/react-cmf';

import { ContainerActionIconToggle, mapStateToProps, mergeProps } from './ActionIconToggle.connect';

jest.unmock('@talend/design-system');

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
	let App;
	beforeAll(async () => {
		const config = await cmf.bootstrap({
			render: false,
			components: {},
		});
		App = config.App;
	});
	it('should render', () => {
		// given
		const context = mock.store.context();

		// when
		const { container } = render(
			<App {...context}>
				<ContainerActionIconToggle
					className="my-awesome-classname"
					icon="talend-awesome-icon"
					id="my-awesome-action-id"
					label="My awesome label"
					tooltipPlacement="top"
					payload={{ type: 'TOGGLE-MY-AWESOME-ACTION' }}
					active
				/>
			</App>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should dispatch on click', async () => {
		// given
		const context = mock.store.context();
		const dispatch = jest.fn();
		const payload = { type: 'TOGGLE-MY-AWESOME-ACTION' };

		render(
			<App {...context}>
				<ContainerActionIconToggle
					className="my-awesome-classname"
					icon="talend-awesome-icon"
					id="my-awesome-action-id"
					label="My awesome label"
					tooltipPlacement="top"
					payload={payload}
					active
					dispatch={dispatch}
				/>
			</App>,
		);

		// when
		await userEvent.click(screen.getByRole('button'));

		// then
		expect(dispatch).toHaveBeenCalledWith(payload);
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
