import React from 'react';

import AppHeaderBar, {
	mapDispatchToProps,
	mapStateToProps,
} from './AppHeaderBar.component';

import { AppHeaderBar as PureAppHeaderBar } from '../pure';

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
});
