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
	describe('should render table header matching with each data object shape', () => {
		const moreComplexDataShape = [
			{
				date: '2017-05-05T11:57:09 -02:00',
				order_id: '5c24d9283f1b4b2eef6d7006',
				index: 0,
				address: {
					number: 696,
					street: 'Livonia Avenue',
					city: 'Ryderwood',
					state: 'Palau',
				},
				products: [
					{
						id: 0,
						name: 'adipisicing',
					},
				],
			},
			{
				date: '2018-07-27T04:51:50 -02:00',
				order_id: '5c24d928d1b4a945677ba565',
				index: 1,
				address: {
					number: 361,
					street: 'Classon Avenue',
					city: 'Macdona',
					state: 'New Jersey',
				},
				products: [
					{
						id: 0,
						name: 'minim',
					},
				],
			},
			{
				date: '2017-10-08T11:59:08 -02:00',
				order_id: '5c24d9289b8a2e6fde1696c5',
				index: 2,
				// IMPORTANT here is the key that is not present in other objects
				phoneNumber: 'phoneNumber',
				address: {
					number: 226,
					street: 'Fane Court',
					city: 'Trail',
					state: 'California',
				},
				products: [
					{
						id: 0,
						name: 'eiusmod',
					},
					{
						id: 1,
						name: 'eu',
					},
					{
						id: 2,
						name: 'voluptate',
					},
					{
						id: 3,
						name: 'exercitation',
					},
				],
			},
			{
				date: '2014-11-09T01:30:23 -01:00',
				order_id: '5c24d928b6b9f3095fd9bc86',
				index: 3,
				address: {
					number: 248,
					street: 'Division Avenue',
					city: 'Southview',
					state: 'Colorado',
				},
				products: [
					{
						id: 0,
						name: 'incididunt',
					},
					{
						id: 1,
						name: 'dolore',
					},
				],
			},
			{
				date: '2015-11-02T04:14:05 -01:00',
				order_id: '5c24d92800a153ae339e8e95',
				index: 4,
				address: {
					number: 732,
					street: 'Foster Avenue',
					city: 'Bancroft',
					state: 'Nebraska',
				},
				products: [
					{
						id: 0,
						name: 'esse',
					},
					{
						id: 1,
						name: 'Lorem',
					},
					{
						id: 2,
						name: 'voluptate',
					},
				],
			},
			{
				date: '2015-01-29T04:17:48 -01:00',
				order_id: '5c24d92876c4d51ed004f4d1',
				index: 5,
				address: {
					number: 241,
					street: 'Newel Street',
					city: 'Bend',
					state: 'New York',
				},
				products: [
					{
						id: 0,
						name: 'aliqua',
					},
					{
						id: 1,
						name: 'minim',
					},
				],
			},
			{
				date: '2018-10-04T05:12:41 -02:00',
				order_id: '5c24d928bff980ca3f12eabe',
				index: 6,
				address: {
					number: 893,
					street: 'Revere Place',
					city: 'Elliston',
					state: 'South Dakota',
				},
				products: [
					{
						id: 0,
						name: 'proident',
						// IMPORTANT here is the object in nested array that contain one more key
						price: 20,
					},
					{
						id: 1,
						name: 'ullamco',
					},
					{
						id: 2,
						name: 'do',
					},
					{
						id: 3,
						name: 'veniam',
					},
					{
						id: 4,
						name: 'tempor',
					},
				],
			},
		];

		it('object with differents keys', () => {
			// When
			const wrapper = shallow(<Table {...props} data={moreComplexDataShape} />);
			// Then
			// control
			expect(wrapper.find('th#my-viewer-order_id').length).toBe(1);
			// test
			expect(wrapper.find('th#my-viewer-phoneNumber').length).toBe(1);
		});

		it('object containing arrays of different length', () => {
			// When
			const wrapper = shallow(<Table {...props} data={moreComplexDataShape} />);
			// Then
			// control
			expect(wrapper.find('th[id="my-viewer-products[0].id"]').length).toBe(1);
			// test
			expect(wrapper.find('th[id="my-viewer-products[4].id"]').length).toBe(1);
		});

		it('object containing arrays of object with differents keys', () => {
			// When
			const wrapper = shallow(<Table {...props} data={moreComplexDataShape} />);
			// Then
			// control
			expect(wrapper.find('th[id="my-viewer-products[0].id"]').length).toBe(1);
			// test
			expect(wrapper.find('th[id="my-viewer-products[0].price"]').length).toBe(1);
		});
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
