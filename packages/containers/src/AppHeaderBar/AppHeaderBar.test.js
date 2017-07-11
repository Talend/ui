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
		// expect(AppHeaderBar.displayName).toBe('Connect(AppHeaderBar)');
		expect(AppHeaderBar.WrappedComponent).toBe(PureAppHeaderBar);
	});
	it('should map dispatch to props bind onClick on react-redux-router', () => {
		const dispatch = jest.fn();
		const connected = mapDispatchToProps(dispatch);
		expect(connected.brandLink.onClick).not.toBe(undefined);
		expect(typeof connected.brandLink.onClick).toBe('function');
		connected.brandLink.onClick();
		expect(dispatch.mock.calls.length).toBe(1);
		expect(dispatch.mock.calls[0].length).toBe(1);
		const call = dispatch.mock.calls[0][0];
		expect(call.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(call.payload.method).toBe('push');
		expect(call.payload.args[0]).toBe('/');
	});
	it('should mergeProps', () => {
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
		const props = mergeProps(stateProps, dispatchProps , ownProps);
		expect(props.brandLink.onClick).toBe(onClick);
		expect(props.brandLink.className).toBe('my custom class');
		expect(props.foo).toBe('bar');
	});
});
