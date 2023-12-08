import { render } from '@testing-library/react';
import Resource from './Resource.component';

jest.mock('date-fns/formatDistanceToNow', () => () => 'over 2 years ago');

describe('Resource component snaps', () => {
	afterAll(() => {
		jest.unmock('date-fns/formatDistanceToNow');
	});

	describe('renderers', () => {
		it('should not render an empty Resource', () => {
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

			const { container } = render(<Resource {...props} />);
			expect(container).toBeEmptyDOMElement();
		});

		it('should render', () => {
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

			const { container } = render(<Resource {...props} />);
			expect(container.firstChild).toMatchSnapshot();
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

			render(<Resource {...props} />);
			expect(document.querySelector('.title')).toHaveTextContent('Title with few actions');
			expect(document.querySelector('.subtitle')).toHaveTextContent('Loreum lopsum');
			expect(document.querySelectorAll('.theme-flag')).toHaveLength(2);
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

			render(<Resource {...props} />);
			expect(document.querySelector('.author')).toBeNull();
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

			render(<Resource {...props} />);
			expect(document.querySelector('.theme-icon')).toBeNull();
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

			render(<Resource {...props} />);
			expect(document.querySelectorAll('.theme-flag[name="talend-badge"]')).toHaveLength(1);
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

			render(<Resource {...props} />);
			expect(document.querySelectorAll('.theme-flag[name="talend-star"]')).toHaveLength(1);
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

			render(<Resource {...props} />);
			expect(document.querySelectorAll('.theme-flag[name="talend-badge"]')).toHaveLength(1);
			expect(document.querySelectorAll('.theme-flag[name="talend-star"]')).toHaveLength(1);
		});
	});
});
