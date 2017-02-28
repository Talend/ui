import React from 'react';
import renderer from 'react-test-renderer';

jest.mock('../../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer',  () => (props) =>
	{
		console.log('LES PROPS **********************************');

		console.log(props);
		console.log(props.children);
		return (<div id="autoSizer">{props.children()}</div>);
	}
);

import Items from './Items.component';

describe('Items', () => {
	it('should display one item in edit mode and the other in default', () => {
		// given
		const props = {
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			currentEdit: {
				validate: {
					disabled: false,
				},
			},
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(),
				onAbortItem: jest.fn(),
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(),
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(),
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(),
				}],
			},
		};

		props.items[0].displayMode = 'DISPLAY_MODE_EDIT';

		function createNodeMock(element) {
			if (element.type === 'input') {
				return {};
			}
			return null;
		}
		const rendererOptions = { createNodeMock };

		// when
		const wrapper = renderer.create(
			<Items {...props} />,
			rendererOptions
		).toJSON();

		// then
		expect(wrapper).toMatchSnapshot();
	});
});
