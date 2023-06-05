import set from 'lodash/set';
import cloneDeep from 'lodash/cloneDeep';
import { screen, render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import createCollapsibleFieldset, { defaultTitle } from './CollapsibleFieldset.component';
import { WidgetContext } from '../../context';
import widgets from '../../utils/widgets';

jest.unmock('@talend/design-system');
jest.mock('ally.js');

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

const props = {
	id: 'my-fieldset',
	schema,
	value,
	onChange: jest.fn(),
};
describe('CollapsibleFieldset', () => {
	it('should render', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();

		// when
		const { container } = render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} />
			</WidgetContext.Provider>,
		);
		expect(container.firstChild).toMatchSnapshot();
	});
	it('should render header only with isClosed props', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} value={{ ...value, isClosed: true }} />
			</WidgetContext.Provider>,
		);
		expect(screen.getByRole('tab')).toHaveTextContent('Jimmy, Somsanith');
		expect(screen.getByRole('button')).toHaveAttribute('aria-expanded', 'false');
	});
	it('should render a custom title', () => {
		const CollapsibleFieldset = createCollapsibleFieldset(customTitle);

		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} />
			</WidgetContext.Provider>,
		);
		expect(screen.getByRole('tab')).toHaveTextContent('Basic: Jimmy Somsanith');
	});
	it('should render without value', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} value={{}} />
			</WidgetContext.Provider>,
		);
		expect(screen.getByRole('tab')).toHaveTextContent('Basic');
	});

	it('should toggle', async () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();

		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} value={{ ...value, isClosed: true }} />
			</WidgetContext.Provider>,
		);
		// when
		await userEvent.click(screen.getByRole('button'));

		// then
		expect(props.onChange).toBeCalledWith(expect.anything(), {
			schema,
			value: { ...value, isClosed: false },
		});
	});

	it('should render Actions component if actions are provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();
		const actions = [
			{ id: 'action1', label: 'Action1', onClick: jest.fn() },
			{ id: 'action2', label: 'Action 2', onClick: jest.fn() },
		];

		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} actions={actions} />
			</WidgetContext.Provider>,
		);
		screen.debug();
		expect(screen.getByRole('button', { name: 'Action1' })).toBeVisible();
		expect(screen.getByRole('button', { name: 'Action 2' })).toBeVisible();
	});

	it('should not render Actions component if actions are not provided', () => {
		const CollapsibleFieldset = createCollapsibleFieldset();

		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} />
			</WidgetContext.Provider>,
		);
		// eslint-disable-next-line jest-dom/prefer-in-document
		expect(screen.queryAllByRole('button')).toHaveLength(1);
	});

	it('should display description', () => {
		// given
		const CollapsibleFieldset = createCollapsibleFieldset();
		// when
		render(
			<WidgetContext.Provider value={widgets}>
				<CollapsibleFieldset {...props} />
			</WidgetContext.Provider>,
		);
		// then
		expect(screen.getByText('This is description')).toBeVisible();
	});
});

describe('defaultTitle', () => {
	it('should return schema.title by default if no emptyTitleFallback has been provided in options', () => {
		// given not used in an array you have the schema.title
		expect(defaultTitle({}, { title: 'Comment' })).toBe('Comment');
		// given no value, you have the schema.title
		expect(defaultTitle({}, schema)).toBe(schema.title);
	});

	it('should return if emptyTitleFallback has been provided and computed title is empty', () => {
		const emptyTitleFallback = 'my custom static fallback title';
		// given not used in an array you have the empty title value provided in options
		expect(defaultTitle({}, {}, { emptyTitleFallback })).toBe(emptyTitleFallback);
		// given no value, you have the empty title value provided in options
		expect(defaultTitle({}, schema, { emptyTitleFallback })).toBe(emptyTitleFallback);
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
	it('should return emptyTitleFallback', () => {
		const emptyMock = cloneDeep(defaultTitleMockData);
		set(emptyMock, ['formData'], {});
		expect(
			defaultTitle(emptyMock.formData, emptyMock.uiSchema, { emptyTitleFallback: 'Undefined' }),
		).toEqual('Undefined');
	});
	it('should return emty title defined by schema if title is empty and emptyTitleFallback not defined in fieldset options but in schema options', () => {
		const separatorInSchemaMock = cloneDeep(defaultTitleMockData);
		set(separatorInSchemaMock, ['formData'], {});
		set(
			separatorInSchemaMock,
			['uiSchema', 'options', 'emptyTitleFallback'],
			'schema title fallback',
		);
		expect(defaultTitle(separatorInSchemaMock.formData, separatorInSchemaMock.uiSchema)).toEqual(
			'schema title fallback',
		);
	});
});
