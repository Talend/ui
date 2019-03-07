import React from 'react';
import { shallow } from 'enzyme';

import ResourcePicker from './ResourcePicker.component';

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

describe('ResourcePicker component snaps', () => {
	it('should render ResourcePicker without any Resource', () => {
		const props = {
			toolbar: {},
			collection: [],
		};

		const wrapper = shallow(<ResourcePicker {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourcePicker with some Resources', () => {
		const props = {
			toolbar: {},
			isLoading: true,
			collection,
		};

		const wrapper = shallow(<ResourcePicker {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourcePicker in filtered mode', () => {
		const props = {
			toolbar: {
				state: {
					certified: true,
					favorites: true,
				},
			},
			collection,
		};

		const wrapper = shallow(<ResourcePicker {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should render ResourcePicker without toolbar', () => {
		const props = {
			collection,
		};

		const wrapper = shallow(<ResourcePicker {...props} />);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
