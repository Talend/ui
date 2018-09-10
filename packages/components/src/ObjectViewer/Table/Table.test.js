import { shallow } from 'enzyme';
import React from 'react';
import Table, {
	getKeys,
	getAbsolutePath,
	getHeaders,
	buildContentHeaders,
} from './Table.component';

describe('Table', () => {
	const props = {
		id: 'my-viewer',
		title: 'my-viewer',
		flat: true,
	};

	it('should render null if data.datas is not an array', () => {
		// Given
		const data = {
			dataset: 'toto',
		};
		// When
		const wrapper = shallow(<Table {...props} data={data} />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render if data is empty', () => {
		// Given
		const data = [];
		// When
		const wrapper = shallow(<Table {...props} data={data} />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render Table with props data as an object', () => {
		// Given
		const schema = new Map();
		schema.set('field0', 'type1').set('field1', 'type2');
		const data = {
			dataset: [{ field0: 'header1' }, { field1: 'header2' }],
			schema,
		};
		// When
		const wrapper = shallow(<Table {...props} data={data} />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
	it('should render Table with props data as an array', () => {
		// Given
		const data = [{ field0: 'header1' }, { field1: 'header2' }];
		// When
		const wrapper = shallow(<Table {...props} data={data} />);
		// Then
		expect(wrapper.getElement()).toMatchSnapshot();
	});
});

describe('Table.getHeaders', () => {
	it('should transform json path to key', () => {
		const headersWithArrayPath = getHeaders(["$['attr'][0]['foo']"], true, 'my-id');
		expect(headersWithArrayPath.length).toBe(1);
		expect(headersWithArrayPath[0]).toEqual({
			key: "$['attr'][0]['foo']",
			header: 'attr[0].foo',
			id: 'my-id-attr[0].foo',
		});

		const headersWithObjectPath = getHeaders(['attr.foo'], true, 'my-id');
		expect(headersWithObjectPath[0]).toEqual({
			key: 'attr.foo',
			header: 'attr.foo',
			id: 'my-id-attr.foo',
		});
	});

	it('should transform json path to key even if the json path is deeply nested', () => {
		const headersWithArrayPath = getHeaders(
			["$['Action'][0]['Geography'][0]['CountryCode'][0]['Geography']['CountryCode']"],
			true,
			'my-id',
		);
		expect(headersWithArrayPath.length).toBe(1);
		expect(headersWithArrayPath[0]).toEqual({
			key: "$['Action'][0]['Geography'][0]['CountryCode'][0]['Geography']['CountryCode']",
			header: 'Action[0].Geography[0].CountryCode[0].Geography.CountryCode',
			id: 'my-id-Action[0].Geography[0].CountryCode[0].Geography.CountryCode',
		});

		const headersWithObjectPath = getHeaders(['Action.Geography.CountryCode'], true, 'my-id');
		expect(headersWithObjectPath[0]).toEqual({
			key: 'Action.Geography.CountryCode',
			header: 'Action.Geography.CountryCode',
			id: 'my-id-Action.Geography.CountryCode',
		});
	});
});

describe('Table.getKeys', () => {
	it('should return keys of obj', () => {
		const keys = getKeys({ attr: ['foo'] });
		expect(keys[0]).toBe('attr');
		expect(keys.length).toBe(1);
	});

	it('should return flatten keys of obj', () => {
		const keys = getKeys({ attr: ['foo'] }, true);
		expect(keys[0]).toBe("$['attr'][0]");
		expect(keys.length).toBe(1);
	});
});

describe('Table.getAbsolutePath', () => {
	it('should return path of obj from key', () => {
		const keys = getKeys({ attr: ['foo'] });
		const path = getAbsolutePath(0, keys[0]);
		expect(path).toBe("$[0]['attr']");
	});

	it('should return path of obj from key [flat]', () => {
		const keys = getKeys({ attr: ['foo'] }, true);
		const path = getAbsolutePath(0, keys[0], true);
		expect(path).toBe("$[0]['attr'][0]");
	});
});

describe('buildContentHeaders', () => {
	it('should return a jsx array with a type', () => {
		// Given
		const headers = [
			{ header: 'myHeader1', id: 'myHeader1Id' },
			{ header: 'myHeader2', id: 'myHeader2Id' },
		];
		const schema = new Map();
		schema.set('myHeader1', 'type1').set('myHeader2', 'type2');
		// When
		const ret = buildContentHeaders(headers, schema);
		// Then
		expect(ret).toMatchSnapshot();
	});
	it('should return a jsx array with no type', () => {
		// Given
		const headers = [
			{ header: 'myHeader1', id: 'myHeader1Id' },
			{ header: 'myHeader2', id: 'myHeader2Id' },
		];
		const schema = new Map();
		schema.set('keyHeader1', 'type1').set('keyHeader2', 'type2');
		// When
		const ret = buildContentHeaders(headers, schema);
		// Then
		expect(ret).toMatchSnapshot();
	});
});
