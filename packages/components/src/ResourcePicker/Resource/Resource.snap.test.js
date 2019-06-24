import React from 'react';
import { shallow } from 'enzyme';

import Resource from './Resource.component';

const dateToYMD = date => {
	const d = date.getDate();
	const m = date.getMonth() + 1;
	const y = date.getFullYear() - 2;
	return `${y}-${m <= 9 ? `0${m}` : m}-${d <= 9 ? `0${d}` : d}`;
};

const modifiedDate = dateToYMD(new Date());

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
					modified: modifiedDate,
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
			expect(wrapper.find('.author').length).toBe(1);
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

			expect(wrapper.find('.author').length).toBe(0);
		});

		it('should render a Resource without icon', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					modified: modifiedDate,
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
					modified: modifiedDate,
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
					modified: modifiedDate,
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
					modified: modifiedDate,
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
