import React from 'react';
import { mount } from 'enzyme';

import VList from './VList.component';
import VirtualizedList from '../../../VirtualizedList';
import { ListContext } from '../context';

describe('List VList', () => {
	it('should pass info to VirtualizedList', () => {
		// given
		const contextValue = {
			displayMode: 'large',
			collection: [{ id: 0 }, { id: 1 }],
		};

		// when
		const wrapper = mount(
			<ListContext.Provider value={contextValue}>
				<VList />
			</ListContext.Provider>,
		);

		// then
		expect(wrapper.find(VirtualizedList).prop('type')).toBe('LARGE');
		expect(wrapper.find(VirtualizedList).prop('collection')).toBe(contextValue.collection);
	});
});
