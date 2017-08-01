import React from 'react';
import renderer from 'react-test-renderer';
import Enumeration from './Enumeration.component';

jest.mock('../../node_modules/react-virtualized/dist/commonjs/AutoSizer/AutoSizer', () => props =>
	<div id="autoSizer">{ props.children({ height: 30, width: 30 }) }</div> // eslint-disable-line react/prop-types
);

describe('Enumeration', () => {
	it('should render with header in default state, list in default state and required component', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			required: true,
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				onSelectItem: jest.fn(), // no click click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
		};
		const wrapper = renderer.create(
			<Enumeration {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header without items', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			inputPlaceholder: 'New entry',

			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: [],
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				onSelectItem: jest.fn(), // no click click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
		};
		const wrapper = renderer.create(
			<Enumeration {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header in add state and list in default state', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_ADD',
			inputPlaceholder: 'New entry',

			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
		};
		const wrapper = renderer.create(
			<Enumeration {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header in search state and list in default state', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SEARCH',
			searchCriteria: 'lorem',
			inputPlaceholder: 'search',

			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			searchInput: [{
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
		};
		const wrapper = renderer.create(
			<Enumeration {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header in default state and first item in edit mode, validate button disabled is disabled', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			currentEdit: {
				validate: {
					disabled: true,
				},
			},
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}, {
					disabled: false,
					label: 'Cancel',
					icon: 'talend-cross',
					id: 'abort',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
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
			<Enumeration {...props} />,
			rendererOptions
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header in selected state with trash icon, and two items in selected mode', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_SELECTED',
			currentEdit: {
				validate: {
					disabled: false,
				},
			},
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
		};
		props.items[0].isSelected = true;
		props.items[1].isSelected = true;

		function createNodeMock(element) {
			if (element.type === 'input') {
				return {};
			}
			return null;
		}

		const rendererOptions = { createNodeMock };

		// when
		const wrapper = renderer.create(
			<Enumeration {...props} />,
			rendererOptions
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});

	it('should render with header in default state with custom label', () => {
		const props = {
			displayMode: 'DISPLAY_MODE_DEFAULT',
			required: true,
			headerDefault: [{
				label: 'Add item',
				icon: 'talend-plus',
				id: 'add',
				onClick: jest.fn(), // no click callback
			}],
			headerInput: [{
				disabled: false,
				label: 'Validate',
				icon: 'talend-check',
				id: 'validate',
				onClick: jest.fn(), // no click callback
			}, {
				label: 'Abort',
				icon: 'talend-cross',
				id: 'abort',
				onClick: jest.fn(), // no click callback
			}],
			headerSelected: [{
				label: 'Selected value',
				id: 'select',
				onClick: jest.fn(), // no click callback
			}],
			items: Array(3).fill('').map((item, index) => ({
				values: [`Lorem ipsum dolor sit amet ${index}`],
			})),
			itemsProp: {
				key: 'values',
				onSubmitItem: jest.fn(), // no click callback
				onAbortItem: jest.fn(), // no click callback
				onSelectItem: jest.fn(), // no click click callback
				getItemHeight: () => 42,
				actionsDefault: [{
					disabled: false,
					label: 'Edit',
					icon: 'talend-pencil',
					id: 'edit',
					onClick: jest.fn(), // no click callback
				}, {
					label: 'Delete',
					icon: 'talend-trash',
					id: 'delete',
					onClick: jest.fn(), // no click callback
				}],
				actionsEdit: [{
					disabled: false,
					label: 'Validate',
					icon: 'talend-check',
					id: 'validate',
					onClick: jest.fn(), // no click callback
				}],
			},
			onAddChange: jest.fn(), // no click callback
			onAddKeyDown: jest.fn(), // no click callback
			label: 'Users',
		};
		const wrapper = renderer.create(
			<Enumeration {...props} />
		).toJSON();
		expect(wrapper).toMatchSnapshot();
	});
});
