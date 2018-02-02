import React from 'react';
import { shallow } from 'enzyme';

import { Badge } from 'react-talend-components';
import Connected, { mapStateToProps } from './Badge.component';

describe('Connected Badge', () => {
	it('should connect Badge', () => {
		expect(Connected.displayName).toBe(`Connect(CMF(${Badge.displayName}))`);
		expect(Connected.WrappedComponent).toBe(Badge);
	});
	it('should map state to props', () => {
		const state = {};
		const props = mapStateToProps(state);
		expect(typeof props).toBe('object');
	});
});
