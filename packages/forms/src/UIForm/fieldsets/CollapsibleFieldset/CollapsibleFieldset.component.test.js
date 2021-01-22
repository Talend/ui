import React from 'react';
import cases from 'jest-in-case';
import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { shallow, mount } from 'enzyme';
import CollapsiblePanel from '@talend/react-components/lib/CollapsiblePanel';
import createCollapsibleFieldset, { defaultTitle } from './CollapsibleFieldset.component';

function customTitle(value, schema) {
	return `${schema.title}: ${value.firstname} ${value.lastname}`;
}

const schema = {
	title: 'Basic',
	description: 'This is description',
	items: [
		{
			key: ['firstname'],
			title: 'FirstName',
			schema: { type: 'string' },
			type: 'string',
		},
		{
			key: ['lastname'],
			title: 'LastName',
			schema: { type: 'string' },
			type: 'string',
		},
	],
};

const value = {
	firstname: 'Jimmy',
	lastname: 'Somsanith',
};

const defaultTitleMockData = {
	formData: {
		columnName: 'age',
		operator: '==',
		value: '50',
	},
	uiSchema: {
		items: [
			{
				key: ['configuration', 'filters', 0, 'columnName'],
				title: 'Column name',
			},
			{
				key: ['configuration', 'filters', 0, 'operator'],
				titleMap: [
					{ name: 'EQUAL', value: '==' },
					{ name: 'INFERIOR', value: '<' },
					{ name: 'SUPERIOR', value: '>' },
				],
				title: 'operator',
			},
			{
				key: ['configuration', 'filters', 0, 'value'],
				title: 'Column name',
			},
		],
	},
};

describe('CollapsibleFieldset', () => {
	cases(
		'should render',
		opts => {
			// given
			const CollapsibleFieldset = createCollapsibleFieldset(opts.titleFn);

			// when
			const wrapper = shallow(
				<CollapsibleFieldset
					id="my-fieldset"
					schema={schema}
					value={{ ...(opts.empty ? {} : value), isClosed: opts.isClosed }}
				/>,
			);

			// then
			expect(wrapper.getElement()).toMatchSnapshot();
		},
		{
			'a full fieldset (header and body)': { isClosed: false },
			'a collapsed fieldset (header only)': { isClosed: true },
			'a custom title': { isClosed: false, titleFn: customTitle },
			'without value': { empty: true },
		},
	);

	it('should toggle', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const event = {
			stopPropagation: jest.fn(),
			preventDefault: jest.fn(),
		};

		const wrapper = shallow(
			<CollapsibleFieldset
				id="my-fieldset"
				onChange={onChange}
				schema={schema}
				value={{ ...value, isClosed: true }}
			/>,
		);
		// when
		wrapper.find(CollapsiblePanel).getElement().props.onToggle(event);

		// then
		expect(event.stopPropagation).toBeCalled();
		expect(event.preventDefault).toBeCalled();
		expect(onChange).toBeCalledWith(event, {
			schema,
			value: { ...value, isClosed: false },
		});
	});

	it('should render Actions component if actions are provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		const actions = [{ id: 'action1' }, { id: 'action2' }];

		const wrapper = mount(
			<CollapsibleFieldset
				id="my-fieldset"
				onChange={onChange}
				schema={schema}
				value={value}
				actions={actions}
			/>,
		);

		expect(wrapper.find('.panel-title button#action1').length).toBe(1);
		expect(wrapper.find('.panel-title button#action2').length).toBe(1);
	});

	it('should not render Actions component if actions are not provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();

		const wrapper = shallow(
			<CollapsibleFieldset id="my-fieldset" onChange={onChange} schema={schema} value={value} />,
		);

		expect(wrapper.exists('Actions')).toEqual(false);
	});

	it('should concat values in case it is used in array', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();

		const wrapper = mount(
			<CollapsibleFieldset id="my-fieldset" onChange={onChange} schema={schema} value={value} />,
		);
		const panel = wrapper.find('CollapsiblePanel');

		expect(panel.props().header[0].label).toEqual(`${value.firstname}, ${value.lastname}`);
	});

	it('should display description', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		const onChange = jest.fn();
		// when
		const wrapper = mount(
			<CollapsibleFieldset id="my-fieldset" onChange={onChange} schema={schema} />,
		);
		// then
		expect(wrapper.find('#my-fieldset-description').text()).toBe('This is description');
	});
});

describe('defaultTitle', () => {
	it('should return schema.title by default if no emptyTitle has been provided in options', () => {
		// given not used in an array you have the schema.title
		expect(defaultTitle({}, { title: 'Comment' })).toBe('Comment');
		// given no value, you have the schema.title
		expect(defaultTitle({}, schema)).toBe(schema.title);
	});
	it('should return if emptyTitle has been provided and formData is empty', () => {
		const emptyTitle = 'my custom static fallback title';
		// given not used in an array you have the empty title value provided in options
		expect(defaultTitle({}, {}, { emptyTitle })).toBe(emptyTitle);
		// given no value, you have the empty title value provided in options
		expect(defaultTitle({}, schema, { emptyTitle })).toBe(emptyTitle);
	});

	it('should return concat values if used in an array', () => {
		expect(defaultTitle(value, schema)).toBe(`${value.firstname}, ${value.lastname}`);
	});
	it('should support option in an array', () => {
		expect(defaultTitle(value, schema, { separator: ' -- || -- ' })).toBe(
			`${value.firstname} -- || -- ${value.lastname}`,
		);
		expect(defaultTitle(value, { ...schema, options: { separator: ' || ' } })).toBe(
			`${value.firstname} || ${value.lastname}`,
		);
	});
	it('should support recursive call', () => {
		expect(defaultTitle(value, schema, { separator: ' -- || -- ' })).toBe(
			`${value.firstname} -- || -- ${value.lastname}`,
		);
		expect(defaultTitle(value, { ...schema, options: { separator: ' || ' } })).toBe(
			`${value.firstname} || ${value.lastname}`,
		);
	});
	it('should support recursive call on deeper objects', () => {
		const complexSchema = {
			title: 'Basic',
			items: [
				{
					key: ['type'],
					title: 'Type',
					schema: { type: 'string' },
					type: 'string',
				},
				{
					key: ['type1', 'subvalue'],
					title: 'Sub value',
					schema: { type: 'string' },
					type: 'string',
				},
			],
		};
		const complexValue = {
			type: 'type1',
			type1: {
				subvalue: 'item',
			},
		};
		expect(defaultTitle(complexValue, complexSchema)).toBe('type1, item');
	});
	it('should build title and replace value by their name in the relevant titleMap', () => {
		expect(defaultTitle(defaultTitleMockData.formData, defaultTitleMockData.uiSchema)).toEqual(
			'age, EQUAL, 50',
		);
	});
	it('should build title and fallback on the value if titleMap is empty', () => {
		const emptyTitleMapMock = cloneDeep(defaultTitleMockData);
		set(emptyTitleMapMock, ['uiSchema', 'items', 1, 'titleMap'], []);
		expect(
			defaultTitle(emptyTitleMapMock.formData, emptyTitleMapMock.uiSchema, { separator: ' ' }),
		).toEqual('age == 50');
	});
	it('should build title and use the separator define in the schema', () => {
		const separatorInSchemaMock = cloneDeep(defaultTitleMockData);
		set(separatorInSchemaMock, ['uiSchema', 'options', 'separator'], ' # ');
		expect(defaultTitle(separatorInSchemaMock.formData, separatorInSchemaMock.uiSchema)).toEqual(
			'age # EQUAL # 50',
		);
	});
});
