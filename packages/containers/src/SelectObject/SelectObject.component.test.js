import { render } from '@testing-library/react';
import { mock } from '@talend/react-cmf';

import Component from './SelectObject.component';

describe('Component SelectObject', () => {
	it('should render', () => {
		const context = mock.store.context();
		const item = { id: '1', name: 'foo', get: k => ({ id: '1', name: 'foo' })[k] };
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
			sourceData: Object.assign([item], { toJS: () => [{ id: '1', name: 'foo' }] }),
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
