/* eslint-disable react/prop-types */
import { render, screen, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import RangeFilter from './RangeFilter.component';
import { NumberRangeHandler } from './handlers';

jest.mock('@talend/react-components', () => ({
	...jest.requireActual('@talend/react-components'),
	Slider: ({ onChange, onAfterChange, value, marks, ...props }) => (
		<div data-testid="Slider" {...props}>
			<button onClick={() => onChange([5, 20])}>Slider.onChange</button>
			<button onClick={() => onAfterChange([5, 20])}>Slider.onAfterChange</button>
			<div data-testid="Slider-marks">
				{Object.keys(marks).map(v => (
					<span key={v} className="rc-slider-mark-text">
						{marks[v]}
					</span>
				))}
			</div>
		</div>
	),
}));

describe('Range filter', () => {
	const mocks = {
		onSliderChange: jest.fn(),
		onAfterChange: jest.fn(),
	};

	beforeEach(() => {
		jest.resetAllMocks();
	});

	describe('Slider', () => {
		it('Should call onSliderChange', () => {
			render(
				<RangeFilter
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={{ min: 15, max: 20 }}
					{...mocks}
				/>,
			);
			fireEvent.click(screen.getByText('Slider.onChange'));

			expect(mocks.onSliderChange).toHaveBeenCalledWith({
				min: 5,
				max: 20,
			});
		});

		it('Should call on', () => {
			render(
				<RangeFilter
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={{ min: 15, max: 20 }}
					{...mocks}
				/>,
			);
			fireEvent.click(screen.getByText('Slider.onAfterChange'));

			expect(mocks.onAfterChange).toHaveBeenCalledWith({
				min: 5,
				max: 20,
			});
		});

		describe('Marks', () => {
			function checkMark(index: number, style: string, value: string) {
				const mark = document.querySelectorAll('.rc-slider-mark-text')[index];
				expect(mark).toHaveTextContent(value);
				expect(mark.querySelector('.theme-range-filter__slider-mark')).toHaveClass(
					`theme-range-filter__slider-mark--${style}`,
				);
			}
			it('Should render min/max on bottom, and other marks on top', () => {
				render(
					<RangeFilter
						range={{ min: 2177.87, max: 9530.28 }}
						limits={{ min: 2177.87, max: 9530.28 }}
						{...NumberRangeHandler}
						{...mocks}
					/>,
				);
				checkMark(0, 'top', '4,000');
				checkMark(1, 'top', '6,000');
				checkMark(2, 'top', '8,000');
				checkMark(3, 'bottom-left', '2,177.87');
				checkMark(4, 'bottom-right', '9,530.28');
			});
		});
	});

	describe('Inputs', () => {
		xit('Should not go outside provided limits', async () => {
			const limits = { min: 10, max: 50 };
			render(
				<RangeFilter
					id="test"
					range={{ min: 15, max: 20 }}
					{...NumberRangeHandler}
					limits={limits}
					{...mocks}
				/>,
			);
			fireEvent.change(screen.getByLabelText('Min'), {
				target: { value: '5', valueAsNumber: 5 },
			});
			fireEvent.change(screen.getByLabelText('Min'), {
				target: { value: '100', valueAsNumber: 100 },
			});
			fireEvent.change(screen.getByLabelText('Max'), {
				target: { value: '100', valueAsNumber: 100 },
			});
			fireEvent.change(screen.getByLabelText('Max'), {
				target: { value: '0', valueAsNumber: 0 },
			});

			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(1, {
				min: limits.min,
				max: 20,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(2, {
				min: 20,
				max: 20,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(3, {
				min: 15,
				max: limits.max,
			});
			expect(mocks.onAfterChange).toHaveBeenNthCalledWith(4, {
				min: 15,
				max: 15,
			});
		});
	});
});
