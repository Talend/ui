import { render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';
import { List, Map } from 'immutable';

import Component from './SelectObject.component';

describe('Component SelectObject', () => {
	it('should render', () => {
		const context = mock.store.context();
		const item = new Map({ id: '1', name: 'foo' });
		const props = {
			id: 'my-tree',
			schema: {
				jsonSchema: {
					type: 'object',
					title: 'Comment',
					properties: {
						name: {
							type: 'string',
						},
					},
				},
			},
			sourceData: new List([item]),
			filter: {
				className: 'my-custom-filter',
			},
			tree: {},
			selected: {
				id: '1',
				name: 'foo',
			},
		};
		const { container } = render(
			<mock.Provider {...context}>
				<Component {...props} />
			</mock.Provider>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
});
