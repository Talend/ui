import React from 'react';
import { shallow } from 'enzyme';

import Resource from './Resource.component';

jest.mock('date-fns/distance_in_words_to_now', () => () => 'over 2 years ago');

describe('Resource component snaps', () => {
	afterAll(() => {
		jest.unmock('date-fns/distance_in_words_to_now');
	});

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

			const wrapper = shallow(<Resource {...props} />);

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

			const wrapper = shallow(<Resource {...props} />);
			expect(wrapper.find('.author').length).toBe(1);
			expect(wrapper.getElement()).toMatchSnapshot();
		});

		it('should render a Resource with just a title/subtitle/flags', () => {
			const collection = [
				{
					id: 0,
					name: 'Title with few actions',
					subtitle: 'Loreum lopsum',
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

			const wrapper = shallow(<Resource {...props} />);
			expect(wrapper.find('.author').length).toBe(0);
			expect(wrapper.find('.subtitle').length).toBe(1);
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

			const wrapper = shallow(<Resource {...props} />);

			expect(wrapper.find('.author').length).toBe(0);
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

			const wrapper = shallow(<Resource {...props} />);

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

			const wrapper = shallow(<Resource {...props} />);

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

			const wrapper = shallow(<Resource {...props} />);

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

			const wrapper = shallow(<Resource {...props} />);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
	});
});
