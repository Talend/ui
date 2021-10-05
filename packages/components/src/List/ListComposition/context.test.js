import React from 'react';
import { mount } from 'enzyme';

import { ListContext, useListContext } from './context';

function TestComponent() {
	const context = useListContext();
	return <div {...context} />;
}

describe('List context', () => {
	it('should throw when used outside of context provider', () => {
		// when
		try {
			mount(<TestComponent />);
			expect.fail(
				'It should have thrown an error because useListContext is used outside of context provider',
			);
		} catch (error) {
			// then
			expect(error.message).toBe(
				'@talend/react-components > List: you are using a sub component out of List.Manager.',
			);
		}
	});
	it('should throw when used outside of context provider', () => {
		// given
		const value = { id: 'lol' };

		// when
		const wrapper = mount(
			<ListContext.Provider value={value}>
				<TestComponent />
			</ListContext.Provider>,
		);
		// then
		expect(wrapper.find('div').prop('id')).toBe('lol');
	});
});
