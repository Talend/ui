import React from 'react';
import renderer from 'react-test-renderer';

import { ActionButton } from 'react-talend-components';
import Connected, { mapDispatchToProps, mapStateToProps } from './ActionButton.component';

describe('Connected ActionButton', () => {
	it('should connect ActionButton', () => {
		expect(Connected.displayName).toBe(`Connect(${ActionButton.displayName})`);
		expect(Connected.WrappedComponent).toBe(ActionButton);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
	it('should map state to props', () => {
		function dispatch() {
		}
		const props = mapDispatchToProps(dispatch);
		expect(typeof props).toBe('object');
	});
});
