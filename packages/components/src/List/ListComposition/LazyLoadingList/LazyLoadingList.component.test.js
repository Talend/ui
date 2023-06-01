/* eslint-disable react/prop-types */
import { render } from '@testing-library/react';

import LazyLoadingList from './LazyLoadingList.component';
import { ListContext } from '../context';

describe('LazyLoadingList', () => {
	const defaultContext = { collection: [], setColumns: jest.fn() };

	it('should render lazy loading list component', () => {
		// when
		const { container } = render(
			<ListContext.Provider value={defaultContext}>
				<LazyLoadingList id="myLazyLoadingList" />
			</ListContext.Provider>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});
});
