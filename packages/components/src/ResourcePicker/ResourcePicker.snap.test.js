import React from 'react';
import { shallow } from 'enzyme';

import ResourcePicker from './ResourcePicker.component';

describe('ResourcePicker component snaps', () => {
	describe('renderers', () => {
		it('should render ResourcePicker without any Resource', () => {
			const props = {
				toolbar: {},
				collection: [],
			};

			const wrapper = shallow(<ResourcePicker {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});

	describe('renderers', () => {
		it('should render ResourcePicker with some Resources', () => {
			const props = {
				toolbar: {},
				collection: [
					{
						id: 0,
						name: 'Title with few actions',
						modified: '2016-09-22',
						author: 'Jean-Pierre DUPONT',
						display: 'text',
						icon: 'talend-file-xls-o',
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
				],
			};

			const wrapper = shallow(<ResourcePicker {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
