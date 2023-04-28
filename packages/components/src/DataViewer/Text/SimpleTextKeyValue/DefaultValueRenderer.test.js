import { screen, render } from '@testing-library/react';
import DefaultValueRenderer from './DefaultValueRenderer.component';
jest.unmock('@talend/design-system');

jest.mock('../../../FormatValue/FormatValue.component', () => {
	return jest.fn(props => (
		<span data-testid="formatvalue" data-value={props.value} data-type={typeof props.value}>
			{props.value}
		</span>
	));
});
jest.mock('../../../TooltipTrigger', () => {
	return jest.fn(props => (
		<span data-testid="tooltip-trigger">
			<span data-testid="tooltip-label">{props.label}</span>
			<span>{props.children}</span>
		</span>
	));
});

describe('#DefaultValueRenderer', () => {
	it('should render without the tooltip', () => {
		render(<DefaultValueRenderer value="loreum" />);
		expect(screen.getByText('loreum')).toBeVisible();
	});

	it('should call FormatValue and pass it the value', () => {
		const VALUES = [false, { bytes: 'ejfiejifje' }, null, undefined, ' loreum '];
		const EXPECTED = ['false', 'ejfiejifje', '', '', ' loreum '];
		let { rerender } = render(null);
		VALUES.forEach(value => {
			rerender(<DefaultValueRenderer value={value} />);
			expect(screen.getByTestId('formatvalue').dataset.value).toBe(EXPECTED[VALUES.indexOf(value)]);
		});
	});

	it('should render DefaultValueRenderer with the tooltip when the label overflow in width', async () => {
		render(<DefaultValueRenderer value="loreum" isValueOverflown />);
		expect(screen.getByTestId('tooltip-trigger')).toBeVisible();
		expect(screen.getByTestId('tooltip-label')).toBeVisible();
		expect(screen.getByTestId('tooltip-label')).toHaveTextContent('loreum');
	});
});
