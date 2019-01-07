import React from 'react';
import { mount } from 'enzyme';

import Resource from './Resource.component';

describe('Resource component snaps', () => {
	describe('renderers', () => {
		it('should render an empty Resource', () => {
			const props = {
				parent: {
					props: {
						collection: [],
					},
				},
				index: 0,
			};

			const wrapper = mount(<Resource {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a regular Resource', () => {
			const props = {
				parent: {
					props: {
						collection: [
							{
								id: 0,
								name: 'Title with few actions',
								modified: '2016-09-22',
								author: 'Jean-Pierre DUPONT',
								icon: 'talend-file-xls-o',
							},
						],
					},
				},
				index: 0,
			};

			const wrapper = mount(<Resource {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource without icon', () => {
			const props = {
				parent: {
					props: {
						collection: [
							{
								id: 0,
								name: 'Title with few actions',
								modified: '2016-09-22',
								author: 'Jean-Pierre DUPONT',
							},
						],
					},
				},
				index: 0,
			};

			const wrapper = mount(<Resource {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
