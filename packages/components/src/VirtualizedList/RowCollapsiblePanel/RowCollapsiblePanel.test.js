import React from 'react';
import { mount, shallow } from 'enzyme';

import toJsonWithoutI18n from '../../../test/props-without-i18n';
import RowCollapsiblePanel from './RowCollapsiblePanel.component';

const collection = [
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'successful',
				label: 'Successful',
				icon: 'talend-check',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'canceled',
				label: 'Canceled',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'failed',
				label: 'Failure',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content1',
				description: 'Description1',
			},
			{
				label: 'Content2',
				description: 'Description2',
			},
		],
		expanded: true,
	},
];

const parent = {
	props: {
		id: 'my-list',
		collection,
		rowGetter: index => collection[index],
		children: [],
	},
};

describe('RowCollapsiblePanel', () => {
	it('should render collapsible panel row', () => {
		// when
		const wrapper = shallow(
			<RowCollapsiblePanel
				className="my-class-names"
				index={1}
				key={18}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);

		expect(wrapper.dive().getElement().props.children({ measure: jest.fn() })).toMatchSnapshot();
	});

	it('should render a row with no data (loading)', () => {
		// given
		const noDataParent = {
			...parent,
			props: {
				...parent.props,
				rowGetter: () => ({}),
			},
		};

		// when
		const wrapper = mount(<RowCollapsiblePanel index={1} parent={noDataParent} />);

		// then
		expect(toJsonWithoutI18n(wrapper.find('.tc-collapsible-row'))).toMatchSnapshot();
	});
});
