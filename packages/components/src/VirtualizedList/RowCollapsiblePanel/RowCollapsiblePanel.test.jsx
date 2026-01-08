/* eslint-disable react/prop-types */
import { screen, render } from '@testing-library/react';
import { measure } from 'react-virtualized';
import RowCollapsiblePanel from './RowCollapsiblePanel.component';

jest.mock('react-virtualized', () => {
	const mod = jest.requireActual('react-virtualized');
	// eslint-disable-next-line @typescript-eslint/no-shadow
	const measure = jest.fn();
	return {
		...mod,
		CellMeasurer: props => <div data-testid="CellMeasurer">{props.children({ measure })}</div>,
		measure,
	};
});

const collection = [
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'successful',
				label: 'Successful',
				icon: 'talend-check',
			},
		],
		content: [
			{
				label: 'Content a.1',
				description: 'Description a.1',
			},
			{
				label: 'Content a.2',
				description: 'Description a.2',
			},
		],
		expanded: true,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'canceled',
				label: 'Canceled',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content b.1',
				description: 'Description b.1',
			},
			{
				label: 'Content b.2',
				description: 'Description b.2',
			},
		],
		expanded: true,
	},
	{
		header: [
			{
				displayMode: 'status',
				actions: [],
				status: 'failed',
				label: 'Failure',
				icon: 'talend-cross',
			},
		],
		content: [
			{
				label: 'Content c.1',
				description: 'Description c.1',
			},
			{
				label: 'Content c.2',
				description: 'Description c.2',
			},
		],
		expanded: true,
	},
];

const parent = {
	props: {
		id: 'my-list',
		collection,
		rowGetter: index => collection[index],
		children: [],
	},
};

describe('RowCollapsiblePanel', () => {
	it('should render collapsible panel row', () => {
		// when
		const { container } = render(
			<RowCollapsiblePanel
				className="my-class-names"
				index={1}
				key={18}
				parent={parent}
				style={{ background: 'red' }}
			/>,
		);
		expect(screen.getByText('Content b.1')).toBeInTheDocument();
		expect(screen.getByText('Content b.2')).toBeInTheDocument();
		expect(screen.getByText('Description b.1')).toBeInTheDocument();
		expect(screen.getByText('Description b.2')).toBeInTheDocument();
		expect(screen.queryByText('Content a.1')).not.toBeInTheDocument();
		expect(screen.queryByText('Content c.1')).not.toBeInTheDocument();

		expect(measure).not.toHaveBeenCalled();
		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render a row with no data (loading)', () => {
		// given
		const noDataParent = {
			...parent,
			props: {
				...parent.props,
				rowGetter: () => ({}),
			},
		};

		// when
		render(<RowCollapsiblePanel index={1} parent={noDataParent} />);

		// then
		expect(document.querySelector('.theme-loading-collapsible-panel')).toBeVisible();
		expect(screen.getByRole('listitem')).toBeVisible();
		expect(screen.getByRole('listitem').firstChild).toHaveClass('theme-loading-collapsible-panel');
	});
});
