/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import ResourceList from './ResourceList.component';

jest.mock(
	'../VirtualizedList',
	() =>
		({ rowHeight, collection, inProgress, type, onRowClick, noRowsRenderer, rowRenderers }) => (
			<div
				data-testid="VirtualizedList"
				data-props={JSON.stringify({ rowHeight, collection, inProgress, type })}
			>
				<div data-testid="rowRenderers">
					{rowRenderers.resource({
						index: 0,
						parent: {
							props: {
								rowHeight,
								collection,
								inProgress,
								type,
								rowGetter: index => collection[index],
							},
						},
					})}
				</div>
				{collection.length === 0 && <div data-testid="noRowsRenderer">{noRowsRenderer()}</div>}
				<button type="button" onClick={() => onRowClick()}>
					onRowClick
				</button>
			</div>
		),
);

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

		const { container } = render(<ResourceList {...props} />);
		expect(container.firstChild).toHaveClass('tc-resource-list');
		expect(screen.getByText('No results')).toBeVisible();
		expect(screen.getByTestId('VirtualizedList')).toBeVisible();
		const renderProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(renderProps).toEqual({
			rowHeight: 100,
			collection: [],
			type: 'resource',
		});
	});

	it('should render ResourceList pass collection to VirtualizedList', () => {
		const props = {
			toolbar: {},
			isLoading: true,
			collection,
		};

		render(<ResourceList {...props} />);
		const renderProps = JSON.parse(screen.getByTestId('VirtualizedList').dataset.props);
		expect(renderProps.collection).toMatchObject(props.collection);
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

		render(<ResourceList {...props} />);
		const toolbar = document.querySelector('.tc-resource-list-toolbar');
		expect(toolbar.nextSibling).toHaveClass('theme-filtered');
	});

	it('should render ResourceList without toolbar', () => {
		const props = {
			collection,
		};

		render(<ResourceList {...props} />);
		expect(document.querySelector('.tc-resource-list-toolbar')).not.toBeInTheDocument();
	});

	it('should render ResourceList with render as Custom Resource', () => {
		const props = {
			collection,
		};

		render(<ResourceList {...props} renderAs={() => <div>Custom Resource</div>} />);
		expect(screen.getByText('Custom Resource')).toBeVisible();
		expect(screen.getByLabelText('Title with few actions')).toBeVisible();
	});
});
