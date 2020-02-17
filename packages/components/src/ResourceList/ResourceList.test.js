import React from 'react';
import { shallow } from 'enzyme';

import ResourceList from './ResourceList.component';

const collection = [
	{
		id: 0,
		name: 'Title with few actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		icon: 'talend-file-xls-o',
		flags: ['CERTIFIED', 'FAVORITE'],
	},
	{
		id: 1,
		name: 'Title with lot of actions',
		modified: '2016-09-22',
		display: 'text',
		icon: 'talend-file-xls-o',
	},
	{
		id: 2,
		name: 'Title with persistant actions',
		modified: '2016-09-22',
		author: 'Jean-Pierre DUPONT',
		display: 'text',
		icon: 'talend-file-xls-o',
	},
];

describe('ResourceList component', () => {
	it('should render ResourceList without any Resource', () => {
		const props = {
			toolbar: {},
			collection: [],
		};

		const wrapper = shallow(<ResourceList {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourceList with some Resources', () => {
		const props = {
			toolbar: {},
			isLoading: true,
			collection,
		};

		const wrapper = shallow(<ResourceList {...props} />);
		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourceList in filtered mode', () => {
		const props = {
			toolbar: {
				state: {
					certified: true,
					favorites: true,
				},
			},
			collection,
		};

		const wrapper = shallow(<ResourceList {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourceList without toolbar', () => {
		const props = {
			collection,
		};

		const wrapper = shallow(<ResourceList {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourceList with render as Custom Resource', () => {
		const props = {
			collection,
		};

		const wrapper = shallow(
			<ResourceList {...props} renderAs={() => <div>Custom Resource</div>} />,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
