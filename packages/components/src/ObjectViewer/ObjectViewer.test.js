import React from 'react';
import { shallow, mount } from 'enzyme';

import ObjectViewer from './ObjectViewer.component';
import JSONLike from './JSONLike';
import List from './List';
import Table from './Table';

describe('ObjectViewer', () => {
	it('should render Tree by default', () => {
		const wrapper = shallow(<ObjectViewer id="my-viewer" data={[]} />);
		expect(wrapper.find(ObjectViewer.Tree).length).toBe(1);
		expect(wrapper.name()).toBe(JSONLike.displayName);
	});
	it('should render List', () => {
		const wrapper = shallow(<ObjectViewer id="my-viewer" displayMode="list" data={[]} />);
		expect(wrapper.find(ObjectViewer.List).length).toBe(1);
		expect(wrapper.name()).toBe(List.displayName);
	});
	it('should render Tree', () => {
		const wrapper = shallow(<ObjectViewer id="my-viewer" displayMode="tree" data={[]} />);
		expect(wrapper.find(ObjectViewer.Tree).length).toBe(1);
		expect(wrapper.name()).toBe(JSONLike.displayName);
	});
	it('should render Table', () => {
		const wrapper = shallow(
			<ObjectViewer id="my-viewer" displayMode="table" data={[]} title="my-table" />,
		);
		expect(wrapper.find(ObjectViewer.Table).length).toBe(1);
		expect(wrapper.name()).toBe(Table.displayName);
	});
	it('should render when no data', () => {
		const wrapper = mount(<ObjectViewer id="my-viewer" displayMode="table" title="my-table" />);
		expect(wrapper.find(ObjectViewer).length).toBe(1);
	});
	it('should render Tree when no data nor dataSchema values', () => {
		const wrapper = mount(
			<ObjectViewer id="my-viewer" displayMode="tree" data={[]} dataSchema={[]} title="my-tree" />,
		);
		expect(wrapper.find(ObjectViewer).length).toBe(1);
		expect(wrapper.name()).toBe(ObjectViewer.displayName);
		expect(wrapper.find(JSONLike).props().data).toEqual([]);
	});
	it('should not convert date when a type is unknown', () => {
		const data = [{ id: '0019000000PCahjAAD', LastModifiedDate: 1565364308000 }];
		const dataSchema = {
			fields: [
				{
					name: 'LastModifiedDate',
					type: {
						type: 'some-type',
						logicalType: 'time-micros',
						'talend.component.DATETIME': 'true',
					},
				},
			],
		};
		const wrapper = mount(
			<ObjectViewer
				id="my-viewer"
				displayMode="tree"
				data={data}
				dataSchema={dataSchema}
				title="my-tree"
			/>,
		);
		expect(wrapper.find(JSONLike).props().data).toEqual([
			{ id: '0019000000PCahjAAD', LastModifiedDate: 1565364308000 },
		]);
	});
	it('should correctely convert date when a type is known', () => {
		const data = [{ id: '0019000000PCahjAAD', LastModifiedDate: 1565364308000 }];
		const dataSchema = {
			fields: [
				{
					name: 'LastModifiedDate',
					type: {
						type: 'long',
						logicalType: 'time-micros',
						'talend.component.DATETIME': 'true',
					},
				},
			],
		};

		const convertedData = [
			{ id: '0019000000PCahjAAD', LastModifiedDate: new Date(1565364308000).toISOString() },
		];
		const wrapper = mount(
			<ObjectViewer
				id="my-viewer"
				displayMode="tree"
				data={data}
				dataSchema={dataSchema}
				title="my-tree"
			/>,
		);
		expect(wrapper.find(JSONLike).props().data).toEqual(convertedData);
	});
});
