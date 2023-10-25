/* eslint-disable react/prop-types */
/* eslint-disable react/display-name */
import { render, screen } from '@testing-library/react';
import CellIconText from './CellIconText.component';

jest.unmock('@talend/design-system');
// jest.mock('../../TooltipTrigger', () => props => (
// 	<div data-testid="TooltipTrigger" aria-label={props.label}>
// 		{props.children}
// 	</div>
// ));

describe('CellIconText', () => {
	it('should render an empty cell', () => {
		render(<CellIconText />);
		expect(document.querySelector('.tc-icon-text')).toBeVisible();
		expect(screen.getByTestId('TooltipTrigger')).toBeVisible();
		expect(document.querySelector('.theme-label')).toBeVisible();
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
