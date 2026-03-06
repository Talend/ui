/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import { vi } from 'vitest';
import CellIconText from './CellIconText.component';

vi.mock('../../TooltipTrigger', () => ({
	default: props => (
		<div data-testid="TooltipTrigger" aria-label={props.label}>
			{props.children}
		</div>
	),
}));

describe('CellIconText', () => {
	it('should render an empty cell', () => {
		const { container } = render(<CellIconText />);
		expect(container.firstChild).toBeVisible();
		expect(screen.getByTestId('TooltipTrigger')).toBeVisible();
		expect(container.querySelector('[class*="label"]')).toBeVisible();
	});

	it('should render an icon cell with an icon', () => {
		const { container } = render(
			<CellIconText
				cellData={{
					icon: 'talend-list',
					label: 'list',
				}}
				rowData={{ iconType: 'iconType' }}
				columnData={{
					getIcon: ({ type }) => type,
					getIconTooltip: rowData => rowData.icon,
				}}
			/>,
		);

		expect(container.firstChild).toMatchSnapshot();
	});

	it('should render an icon cell with an icon using the getIcon method', () => {
		const getIcon = jest.fn(({ type }) => `hihihi-${type}`);
		render(<CellIconText cellData="List" rowData={{ type: 'list' }} columnData={{ getIcon }} />);
		expect(getIcon).toHaveBeenCalledWith({ type: 'list' });
		expect(screen.getByText('List')).toBeVisible();
		expect(document.querySelector('.tc-icon')).toHaveAttribute('name', 'hihihi-list');
	});
});
