import { screen, render } from '@testing-library/react';
import RowLarge from './RowLarge.component';
import VirtualizedList from '..';
import CellTitle from '../CellTitle';

const titleProps = {
	id: 'my-list',
	actionsKey: 'titleActions',
	displayModeKey: 'display',
	iconKey: 'icon',
};

const titleActions = [
	{
		id: 'edit',
		label: 'edit',
		icon: 'talend-pencil',
		onClick: jest.fn(),
	},
	{
		id: 'delete',
		label: 'delete',
		icon: 'talend-trash',
		onClick: jest.fn(),
	},
];

const collection = [
	{
		id: 0,
		name: 'Title from first item',
		description: 'This comes from first element in collection',
		titleActions,
	},
	{
		id: 1,
		name: 'Title from second item',
		description: 'This comes from second element in collection',
		titleActions,
	},
];

const parent = {
	props: {
		id: 'my-list',
		collection,
		rowGetter: index => collection[index],
		children: [
			<VirtualizedList.Content
				key={1}
				label="Id"
				dataKey="id"
				width={50}
				flexShrink={0}
				flexGrow={0}
				columnData={{}}
			/>,
			<VirtualizedList.Content
				key={2}
				label="Name"
				dataKey="name"
				width={350}
				flexShrink={0}
				flexGrow={0}
				columnData={titleProps}
				{...CellTitle}
			/>,
			<VirtualizedList.Content
				key={3}
				label="Description"
				dataKey="name"
				width={350}
				flexShrink={0}
				flexGrow={0}
				columnData={{}}
			/>,
		],
	},
};

describe('RowLarge', () => {
	beforeEach(() => {
		jest.spyOn(global.Math, 'random').mockReturnValue(0.5);
	});

	afterEach(() => {
		jest.spyOn(global.Math, 'random').mockRestore();
	});

	it('should render large row', () => {
		// when
		const { container } = render(
			<RowLarge
				className="my-class-names"
				index={1}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);

		// then
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render RandomSizeSkeleton with empty data', () => {
		// given
		const noDataParent = {
			...parent,
			props: {
				...parent.props,
				rowGetter: () => ({}),
			},
		};

		// when
		render(<RowLarge className="my-class-names" index={1} parent={noDataParent} />);

		// then 3 columns on one line
		expect(screen.getByRole('listitem')).toBeVisible();
		expect(screen.getAllByLabelText('text Loading...')).toHaveLength(3);
	});
});
