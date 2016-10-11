import React from 'react';

import AppHeaderBar, {
	mapStateToProps,
	mapDispatchToProps,
} from './AppHeaderBar.component';

import { AppHeaderBar as PureAppHeaderBar } from 'react-talend-components/lib';

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
		expect(AppHeaderBar.displayName).toBe(`Connect(${PureAppHeaderBar.displayName})`);
		expect(AppHeaderBar.WrappedComponent).toBe(PureAppHeaderBar);
	});
	it('should map dispatch to props bind onClick on react-redux-router', () => {
		const dispatch = jest.fn();
		const connected = mapDispatchToProps(dispatch);
		expect(connected.onClick).not.toBe(undefined);
		expect(typeof connected.onClick).toBe('function');
		connected.onClick();
		expect(dispatch.mock.calls.length).toBe(1);
		expect(dispatch.mock.calls[0].length).toBe(1);
		const call = dispatch.mock.calls[0][0];
		expect(call.type).toBe('@@router/CALL_HISTORY_METHOD');
		expect(call.payload.method).toBe('push');
		expect(call.payload.args[0]).toBe('/');
	});
});
