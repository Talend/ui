import { AppHeaderBar as PureAppHeaderBar } from 'react-talend-components';

import AppHeaderBar, {
	mapStateToProps,
	mapDispatchToProps,
	mergeProps,
} from './AppHeaderBar.component';

jest.mock('react-talend-components');

describe('AppHeaderBar', () => {
	it('should map state to props', () => {
		const state = {
			cmf: {
				settings: {
					views: {
						appheaderbar: {
							logo: 'my logo',
						},
					},
				},
			},
		};
		const props = mapStateToProps(state);
		expect(props.logo).toBe('my logo');
	});

	it('should be connected to the store', () => {
		expect(AppHeaderBar.WrappedComponent).toBe(PureAppHeaderBar);
	});

	it('should map dispatch to props bind onClick on react-redux-router', () => {
		// given
		const dispatch = jest.fn();
		const connected = mapDispatchToProps(dispatch);
		expect(connected.brandLink.onClick).toBeDefined();
		expect(typeof connected.brandLink.onClick).toBe('function');

		// when
		connected.brandLink.onClick();

		// then
		expect(dispatch.mock.calls.length).toBe(1);
		expect(dispatch).toBeCalledWith({
			type: '@@router/CALL_HISTORY_METHOD',
			payload: {
				method: 'push',
				args: ['/'],
			},
		});
	});

	it('should mergeProps', () => {
		// given
		const onClick = jest.fn();
		const stateProps = {
			brandLink: {
				className: 'my custom class',
			},
		};
		const dispatchProps = {
			brandLink: {
				onClick,
			},
		};
		const ownProps = { foo: 'bar' };

		// when
		const props = mergeProps(stateProps, dispatchProps, ownProps);

		// then
		expect(props).toEqual({
			brandLink: {
				className: 'my custom class',
				onClick,
			},
			foo: 'bar',
		});
	});
});
