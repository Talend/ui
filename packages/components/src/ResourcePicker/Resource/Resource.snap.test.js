import React from 'react';
import { shallow } from 'enzyme';

import Resource from './Resource.component';

describe('Resource component snaps', () => {
	describe('renderers', () => {
		it('should render an empty Resource', () => {
			const collection = [];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a regular Resource', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
					icon: 'talend-file-xls-o',
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a regular Resource without author information', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					icon: 'talend-file-xls-o',
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource without icon', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource with CERTIFIED flag', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
					icon: 'talend-file-xls-o',
					flags: ['CERTIFIED'],
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource with FAVORITE flag', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
					icon: 'talend-file-xls-o',
					flags: ['FAVORITE'],
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource with both CERTIFIED and FAVORITE flags', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: '2016-09-22',
					author: 'Jean-Pierre DUPONT',
					icon: 'talend-file-xls-o',
					flags: ['CERTIFIED', 'FAVORITE'],
				},
			];
			const props = {
				parent: {
					props: {
						collection,
						rowGetter: index => collection[index],
					},
				},
				index: 0,
			};

			const wrapper = shallow(<Resource.WrappedComponent {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
