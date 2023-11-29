/* eslint-disable react/display-name */
/* eslint-disable react/prop-types */
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { PIECHART_SIZES } from './PieChartIcon.component';
import PieChartButton, { decorateWithOverlay, wrapMouseEvent } from './PieChartButton.component';

jest.mock('../OverlayTrigger/overlay', () => ({
	getAdaptedPlacement: () => 'top',
	getOverlayElement: () => ({
		getBoundingClientRect: () => ({
			bottom: 290,
			height: 100,
			top: 190,
		}),
	}),
	getContainerElement: () => ({
		getBoundingClientRect: () => ({
			bottom: 270,
			top: 0,
		}),
	}),
}));
describe('PieChartButton', () => {
	describe('snapshots render', () => {
		const pieChartData = [
			{
				color: 'rio-grande',
				percentage: 50,
			},
			{
				color: 'chestnut-rose',
				percentage: 12,
			},
			{
				color: 'lightning-yellow',
				percentage: 1,
			},
			{
				color: 'dove-gray',
				percentage: 4,
			},
			{
				color: 'silver-chalice',
				percentage: 3,
			},
		];
		it('should render a PieChartButton', () => {
			render(<PieChartButton display={PIECHART_SIZES.SMALL} model={pieChartData} />);
			expect(screen.getByRole('button')).toBeVisible();
		});
		it('should render nothing', () => {
			render(
				<PieChartButton
					available={false}
					display={PIECHART_SIZES.MEDIUM}
					labelIndex={2}
					model={pieChartData}
				/>,
			);
			expect(screen.queryByRole('button')).not.toBeInTheDocument();
		});
		it('should trigger onClick', async () => {
			const user = userEvent.setup();

			const onClick = jest.fn();
			render(
				<PieChartButton
					label="my label"
					display={PIECHART_SIZES.SMALL}
					model={pieChartData}
					onClick={onClick}
				/>,
			);
			await user.click(screen.getByRole('button'));

			expect(onClick).toHaveBeenCalledWith(expect.anything({ type: 'click' }), {
				action: {
					label: 'my label',
				},
				model: pieChartData,
			});
		});

		it('should render a PieChartButton with an overlay', async () => {
			const user = userEvent.setup();

			const overlayComponent = <div data-testid="TestOverlay">I am an overlay</div>;
			render(
				<PieChartButton
					display={PIECHART_SIZES.MEDIUM}
					labelIndex={2}
					model={pieChartData}
					overlayComponent={overlayComponent}
					overlayId="id-popover"
				/>,
			);
			await user.click(screen.getByRole('button'));
			expect(screen.getByRole('tooltip')).toBeVisible();
		});
		it('should called refs methods', () => {
			// given
			const overlayComponent = <div className="fake-overlay">WAT</div>;
			// when
			const myButtonRef = jest.fn();
			const myOverlayRef = jest.fn();
			render(
				<PieChartButton
					display={PIECHART_SIZES.MEDIUM}
					labelIndex={2}
					model={pieChartData}
					overlayComponent={overlayComponent}
					overlayId="id-popover"
					buttonRef={myButtonRef}
					overlayRef={myOverlayRef}
				/>,
			);
			expect(myButtonRef).toHaveBeenCalled();
			expect(myOverlayRef).toHaveBeenCalled();
		});
	});
});

describe('decorateWithOverlay', () => {
	it('should return the same component if no overlayComponent', () => {
		// given
		const btn = <div className="fake-button-element" />;
		// when
		const modified = decorateWithOverlay(btn);
		// then
		expect(modified).toBe(btn);
	});

	it('should return the component wrapped', () => {
		// given
		const btn = <div className="fake-button-element" />;
		const overlayComponent = <div className="fake-overlay" />;
		// when
		const modified = decorateWithOverlay(btn, 'top', overlayComponent, 'id-test');
		// then
		expect(modified).not.toBe(btn);
		expect(modified).toMatchSnapshot();
	});
	it('should trigger ref function', () => {
		// given
		const btn = <div className="fake-button-element" />;
		const overlayComponent = <div className="fake-overlay" />;
		// when
		const myBindRef = jest.fn();
		function OverlayCmp() {
			return (
				<div>{decorateWithOverlay(btn, 'top', overlayComponent, 'myDumbOverlay', myBindRef)}</div>
			);
		}
		render(<OverlayCmp />);
		expect(myBindRef).toHaveBeenCalled();
	});
});

describe('wrapMouseEvent', () => {
	it('should return null if there is an overlay component', () => {
		// given
		const onClick = jest.fn();
		const overlayComponent = <div className="fake-overlay" />;

		// when
		const result = wrapMouseEvent(onClick, overlayComponent, 'label');

		// then
		expect(result).toBeNull();
	});
	it('should return a wrapped handler if there is no overlay component', () => {
		// given
		const onClick = jest.fn();

		// when
		const result = wrapMouseEvent(onClick, null, 'label');

		// then
		expect(result).not.toBeNull();
		expect(onClick).not.toHaveBeenCalled();
		result();
		expect(onClick).toHaveBeenCalled();
	});
});
