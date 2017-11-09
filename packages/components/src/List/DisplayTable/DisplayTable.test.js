import React from 'react';
import { shallow, mount } from 'enzyme';
import faker from 'faker';

import DisplayTable, {
	CellContent,
	RowRenderer,
	ColumnHeader,
	ListHeaders,
} from './DisplayTable.component';

faker.seed(42);
const items = [
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		actions: [
			{
				label: 'edit',
				icon: 'fa fa-edit',
				onClick: jest.fn(),
			},
			{
				label: 'delete',
				icon: 'fa fa-trash-o',
				onClick: jest.fn(),
			},
		],
		icon: 'fa fa-file-excel-o',
		className: 'item-0-class',
	},
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
		icon: 'fa fa-file-pdf-o',
		className: 'item-1-class',
	},
	{
		id: faker.random.number(),
		name: faker.random.words(),
		created: '2016-09-22',
		modified: '2016-09-22',
		author: faker.fake('{{name.firstName}} {{name.lastName}}'),
	},
];

const columns = [
	{ key: 'id', label: 'Id' },
	{ key: 'name', label: 'Name' },
	{ key: 'author', label: 'Author' },
	{ key: 'created', label: 'Created' },
	{ key: 'modified', label: 'Modified' },
];

describe('DisplayTable', () => {
	it('should trigger sort on new column', () => {
		// given
		const sort = {
			field: 'name',
			isDescending: false,
			onChange: jest.fn(),
		};
		const props = {
			items,
			columns,
			sort,
		};

		// when
		const list = <DisplayTable {...props} />;
		const wrapper = mount(list);
		wrapper
			.find('th')
			.at(2)
			.find('button')
			.simulate('click');

		// then
		expect(sort.onChange).toBeCalled();
		expect(sort.onChange.mock.calls[0][1]).toEqual({
			field: 'author',
			isDescending: false,
		});
	});

	it('should trigger sort on current column with reverse direction', () => {
		// given
		const sort = {
			field: 'name',
			isDescending: true,
			onChange: jest.fn(),
		};
		const props = {
			items,
			columns,
			sort,
		};

		// when
		const list = <DisplayTable {...props} />;
		const wrapper = mount(list);
		wrapper
			.find('th')
			.at(1)
			.find('button')
			.simulate('click');

		// then
		expect(sort.onChange).toBeCalled();
		expect(sort.onChange.mock.calls[0][1]).toEqual({
			field: 'name',
			isDescending: false,
		});
	});
});

describe('CellContent', () => {
	it('should render', () => {
		const wrapper = shallow(<CellContent column={{ key: 'test' }} item={{ test: 'hello' }} />);
		expect(wrapper.node).toMatchSnapshot();
	});
	it('should render undefined', () => {
		const wrapper = shallow(<CellContent column={{ key: 'test' }} item={{}} />);
		expect(wrapper.node).toMatchSnapshot();
	});
	it('should render array', () => {
		const wrapper = shallow(
			<CellContent column={{ key: 'test' }} item={{ test: [{ label: 'action' }] }} />,
		);
		expect(wrapper.node).toMatchSnapshot();
	});
	it('should render title', () => {
		const wrapper = shallow(
			<CellContent
				column={{ key: 'test' }}
				item={{ test: 'hello' }}
				isTitle
				id="my-id"
				titleProps={{ foo: 'bar' }}
			/>,
		);
		expect(wrapper.node).toMatchSnapshot();
	});
});

describe('RowRenderer', () => {
	it('should render', () => {
		const wrapper = shallow(
			<RowRenderer
				columns={[{ key: 'foo' }, { key: 'baz' }]}
				item={{ foo: 'bar', baz: 'hello' }}
				titleProps={{ key: 'foo' }}
			/>,
		);
		expect(wrapper.node).toMatchSnapshot();
	});
});

describe('ColumnHeader', () => {
	it('should render', () => {
		const wrapper = shallow(<ColumnHeader column={{ key: 'test', label: 'Test' }} />);
		expect(wrapper.node).toMatchSnapshot();
	});
	it('should render an invisible screen reader compatible column header', () => {
		const wrapper = shallow(
			<ColumnHeader column={{ key: 'test', label: 'Test', hideHeader: true }} />,
		);
		expect(wrapper.node).toMatchSnapshot();
	});
	it('should render with sort', () => {
		const wrapper = shallow(
			<ColumnHeader
				column={{ key: 'test', label: 'Test' }}
				sort={{ field: 'test', onChange: jest.fn() }}
			/>,
		);
		expect(wrapper.node).toMatchSnapshot();
	});
});

describe('ListHeaders', () => {
	it('should render', () => {
		const wrapper = shallow(<ListHeaders columns={[{ item: 'value' }]} sort={{ foo: 'bar' }} />);
		expect(wrapper.node).toMatchSnapshot();
	});
});
