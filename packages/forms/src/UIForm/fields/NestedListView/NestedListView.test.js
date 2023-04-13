import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import ReactDOM from 'react-dom';
import { NestedListViewWidget } from './NestedListView.component';
import { getDisplayedItems, prepareItemsFromSchema } from './NestedListView.utils';

jest.useFakeTimers();
jest.spyOn(global, 'setTimeout');

describe('NestedListView component', () => {
	let props;

	beforeEach(() => {
		props = {
			id: 'NestedListView',
			onChange: jest.fn(),
			onFinish: jest.fn(),
			schema: {
				title: 'Nested ListView',
				schema: {
					properties: {
						bar: {
							items: {
								type: 'string',
								enum: ['bar_1', 'bar_2'],
								enumNames: ['Bar 1', 'Bar 2'],
							},
						},
						foo: {
							items: {
								type: 'string',
								enum: ['foo_1', 'foo_2'],
								enumNames: ['Foo 1', 'Foo 2'],
							},
						},
					},
				},
				items: [
					{
						key: ['bar'],
						title: 'Bar',
						titleMap: [
							{ name: 'Bar 1', value: 'bar_1' },
							{ name: 'Bar 2', value: 'bar_2' },
						],
					},
					{
						key: ['foo'],
						title: 'Foo',
						titleMap: [
							{ name: 'Foo 1', value: 'foo_1' },
							{ name: 'Foo 2', value: 'foo_2' },
						],
					},
				],
				value: {},
				t: jest.fn(),
			},
			value: {},
		};
	});

	it('should render component', () => {
		// when
		render(<NestedListViewWidget {...props} />);

		// nested checkboxes shouldn't be available until the main checkbox is expanded
		expect(
			screen.queryByRole('checkbox', {
				name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
			}),
		).not.toBeInTheDocument();
		// when expanding the main checkbox
		userEvent.click(
			screen.getByRole('button', {
				name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
			}),
		);
		// then the nested checkboxes are displayed
		expect(
			screen.getByRole('checkbox', {
				name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
			}),
		).toBeVisible();
		expect(
			screen.getByRole('checkbox', {
				name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
			}),
		).not.toBeChecked();
		// when selecting the main checkbox
		userEvent.click(
			screen.getByRole('checkbox', {
				name: `Select ${props.schema.items[0].title}`,
			}),
		);
		// then the nested checkboxes are selected
		expect(
			screen.getByRole('checkbox', {
				name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
			}),
		).toBeChecked();
		// when expanding and selecting the main checkbox
		userEvent.click(
			screen.getByRole('button', {
				name: new RegExp(`\\b${props.schema.items[1].title}\\b`, 'i'),
			}),
		);
		userEvent.click(
			screen.getByRole('checkbox', {
				name: `Select ${props.schema.items[1].title}`,
			}),
		);
		// then the nested checkboxes are selected
		expect(
			screen.getByRole('checkbox', {
				name: new RegExp(`\\b${props.schema.items[1].titleMap[0].name}\\b`, 'i'),
			}),
		).toBeChecked();
	});

	describe('componentDidUpdate', () => {
		it('should update items on props.value change', () => {
			// given
			const node = document.createElement('div');
			// eslint-disable-next-line react/no-render-return-value
			const instance = ReactDOM.render(<NestedListViewWidget {...props} value={{}} />, node);
			const previousItems = instance.state.displayedItems;
			expect(previousItems.length).toBe(2);
			previousItems.forEach(({ checked, children }) => {
				expect(checked).toBe(false);
				children.forEach(childrenItem => expect(childrenItem.checked).toBe(false));
			});

			// when : trigger a props update
			const allValues = props.schema.items.reduce((acc, item) => {
				acc[item.key] = item.titleMap.map(titleMapItem => titleMapItem.value);
				return acc;
			}, {});
			ReactDOM.render(<NestedListViewWidget {...props} value={allValues} />, node);

			// then
			const nextItems = instance.state.displayedItems;
			expect(nextItems.length).toBe(2);
			nextItems.forEach(({ checked, children }) => {
				expect(checked).toBe(true);
				children.forEach(childrenItem => expect(childrenItem.checked).toBe(true));
			});
		});
	});

	describe('onExpandToggle', () => {
		it('should expand the right children', () => {
			// when
			render(<NestedListViewWidget {...props} />);
			// nested checkboxes shouldn't be available until the main checkbox is expanded
			expect(
				screen.queryByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeInTheDocument();
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// then the nested checkboxes are displayed and not checked
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).toBeVisible();
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeChecked();
			// when selecting the main checkbox
			userEvent.click(
				screen.getByRole('checkbox', {
					name: `Select ${props.schema.items[0].title}`,
				}),
			);
			// then the nested checkboxes are selected
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).toBeChecked();
		});

		it('should collapse an already expanded section', () => {
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// then the nested checkboxes are displayed and not checked
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).toBeVisible();
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeChecked();
			// when collapsing the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// nested checkboxes shouldn't be available until the main checkbox is expanded
			expect(
				screen.queryByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeInTheDocument();
		});
	});

	describe('onParentChange', () => {
		it('should select all children when parent is selected and no child is selected', () => {
			// when
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// then the nested checkboxes are displayed and not checked
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).toBeVisible();
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeChecked();
			// when selecting the main checkbox
			userEvent.click(
				screen.getByRole('checkbox', {
					name: `Select ${props.schema.items[0].title}`,
				}),
			);
			// then all the children checkboxes are selected
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).toBeChecked();
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[1].name}\\b`, 'i'),
				}),
			).toBeChecked();
		});

		it('should unselect all children when parent is selected and at least a child is already selected', () => {
			// when
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// selecting the children
			userEvent.click(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			);
			// when unselecting the parent checkbox
			userEvent.click(
				screen.getByRole('checkbox', {
					name: `Deselect ${props.schema.items[0].title}`,
				}),
			);
			// then all the children checkboxes are unselected
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			).not.toBeChecked();
			expect(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[1].name}\\b`, 'i'),
				}),
			).not.toBeChecked();
		});
	});

	describe('onChange', () => {
		it('should call both onChange and onFinish props', () => {
			const value = { bar: ['bar_1'] };
			// when
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// selecting the children
			userEvent.click(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			);

			// then
			expect(props.onChange).toHaveBeenCalledWith(expect.any(Object), {
				schema: props.schema,
				value,
			});

			expect(props.onFinish).toHaveBeenCalledWith(expect.any(Object), {
				schema: props.schema,
				value,
			});
		});
	});

	describe('onCheck', () => {
		it('should add a value', () => {
			const value = { bar: ['bar_2'] };
			// when
			render(<NestedListViewWidget {...props} value={value} />);
			// selecting the children
			userEvent.click(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			);

			// then
			expect(props.onChange).toHaveBeenCalledWith(expect.any(Object), {
				schema: props.schema,
				value,
			});
		});

		it('should remove a value', () => {
			// given
			props.value = { bar: ['bar_1', 'bar_2'] };

			// when
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// selecting the children
			userEvent.click(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[1].name}\\b`, 'i'),
				}),
			);

			// then
			expect(props.onChange).toHaveBeenCalledWith(expect.any(Object), {
				schema: props.schema,
				value: { bar: ['bar_1'] },
			});
		});
	});

	describe('onInputChange', () => {
		it('should debounced-refresh items props', () => {
			// when
			render(<NestedListViewWidget {...props} />);
			// when expanding the main checkbox
			userEvent.click(
				screen.getByRole('button', {
					name: new RegExp(`\\b${props.schema.items[0].title}\\b`, 'i'),
				}),
			);
			// selecting the children
			userEvent.click(
				screen.getByRole('checkbox', {
					name: new RegExp(`\\b${props.schema.items[0].titleMap[0].name}\\b`, 'i'),
				}),
			);
			jest.runAllTimers();

			// then
			expect(setTimeout).toHaveBeenCalled();
		});
	});

	describe('onComponentUpdate', () => {
		it('should filter out the items not matching the search criteria', () => {
			render(<NestedListViewWidget {...props} />);

			// when
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));

			// then
			expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
			expect(screen.getByRole('checkbox', { name: 'Select Foo' })).toBeInTheDocument();

			// when user types in the search field
			userEvent.type(screen.getByRole('textbox', { name: 'Search' }), 'Bar 1');
			jest.runAllTimers();

			// then
			expect(screen.getAllByRole('option').length).toBe(1);
			expect(screen.getByRole('checkbox', { name: 'Select Bar' })).toBeInTheDocument();
			expect(screen.queryByRole('checkbox', { name: 'Select Foo' })).not.toBeInTheDocument();
		});
	});

	describe('switchToSearchMode', () => {
		it('should switch to "search" mode', () => {
			render(<NestedListViewWidget {...props} />);

			// when clicking on the search action
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));

			// then switches to search mode
			expect(screen.getByRole('textbox', { name: 'Search' })).toBeInTheDocument();
			expect(
				screen.queryByRole('link', { name: 'Search for specific values' }),
			).not.toBeInTheDocument();
		});
	});

	describe('switchToDefaultMode', () => {
		it('should switch to "default" mode', () => {
			render(<NestedListViewWidget {...props} />);
			userEvent.click(screen.getByRole('link', { name: 'Search for specific values' }));

			// when clicking on the close action
			userEvent.click(screen.getByRole('link', { name: 'Abort' }));

			// then switches to default mode
			expect(screen.getByRole('link', { name: 'Search for specific values' })).toBeInTheDocument();
		});
	});
});

describe('NestedListView utils', () => {
	describe('prepareItemsFromSchema', () => {
		it('should prepare items from schema prop', () => {
			// given
			const schema = {
				items: [
					{
						title: 'Bar',
						key: ['foo', 'bar'],
						titleMap: [
							{ label: 'Baz', value: 'baz' },
							{ label: 'Boo', value: 'boo' },
						],
					},
				],
				required: true,
				title: 'title',
				placeholder: 'placeholder',
			};

			const callbacks = {
				onExpandToggle: jest.fn(),
				onParentChange: jest.fn(),
				onCheck: jest.fn(),
			};

			// when
			const items = prepareItemsFromSchema(schema, callbacks, {});

			// then
			expect(items[0].onExpandToggle).toBe(callbacks.onExpandToggle);
			expect(items[0].onChange).toBe(callbacks.onParentChange);
			expect(items[0].children[0].onChange).toBe(callbacks.onCheck);
			expect(items[0].children[1].onChange).toBe(callbacks.onCheck);
		});
	});

	describe('getDisplayedItems', () => {
		const items = [
			{
				key: 'fruits',
				label: 'Fruits',
				children: [
					{ label: 'Orange', value: 'orange' },
					{ label: 'Apple', value: 'apple' },
				],
			},
			{
				key: 'vegetables',
				label: 'Vegetables',
				children: [
					{ label: 'Carrot', value: 'carrot' },
					{ label: 'Pineapple', value: 'pineapple' },
					{ label: 'Tomato', value: 'tomato' },
				],
			},
			{
				key: 'single',
				label: 'Single',
				children: [{ label: 'Single', value: 'single' }],
			},
		];

		const value = { fruits: ['orange'] };

		it('should get displayed items with preset values', () => {
			// given
			const searchCriteria = '';

			// when
			const displayedItems = getDisplayedItems(items, value, searchCriteria);

			// then
			expect(displayedItems).toHaveLength(3); // Number of displayed items and sub items
			expect(displayedItems[0].children).toHaveLength(2);
			expect(displayedItems[1].children).toHaveLength(3);
			expect(displayedItems[2].children).toHaveLength(1);
			expect(displayedItems[0].checked).toBe(true); // Sections checked
			expect(displayedItems[1].checked).toBe(false);
			expect(displayedItems[0].children[0].checked).toBe(true); // Elements checked
			expect(displayedItems[0].children[1].checked).toBe(false);
			expect(displayedItems[1].children[0].checked).toBe(false);
			expect(displayedItems[1].children[1].checked).toBe(false);
			expect(displayedItems[1].children[2].checked).toBe(false);
			expect(displayedItems[2].children[0].checked).toBe(false);
		});

		it('should filter displayed items according to given search criteria', () => {
			// given
			const searchCriteria = 'apple';

			// when
			const displayedItems = getDisplayedItems(items, value, searchCriteria);

			// then
			expect(displayedItems).toHaveLength(2); // Number of displayed items and sub items
			expect(displayedItems[0].children).toHaveLength(1);
			expect(displayedItems[1].children).toHaveLength(1);
			expect(displayedItems[0].checked).toBe(true); // Sections checked
			expect(displayedItems[1].checked).toBe(false);
			expect(displayedItems[0].children[0].checked).toBe(false); // Elements checked
			expect(displayedItems[1].children[0].checked).toBe(false);
		});

		it('should filter displayed parent items according to given search criteria', () => {
			// given
			const searchCriteria = 'vegetables';

			// when
			const displayedItems = getDisplayedItems(items, value, searchCriteria);

			// then
			expect(displayedItems).toHaveLength(1); // Number of displayed items and sub items
			expect(displayedItems[0].children).toHaveLength(3);
			expect(displayedItems[0].checked).toBe(false); // Sections checked
			expect(displayedItems[0].children[0].checked).toBe(false); // Elements checked
			expect(displayedItems[0].children[1].checked).toBe(false);
			expect(displayedItems[0].children[1].checked).toBe(false);
		});
	});
});
