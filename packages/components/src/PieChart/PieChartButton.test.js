import React from 'react';
import { shallow, mount } from 'enzyme';
import { PIECHART_SIZES } from './PieChartIcon.component';
import PieChartButton, { decorateWithOverlay, wrapMouseEvent } from './PieChartButton.component';

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
			const wrapper = shallow(
				<PieChartButton display={PIECHART_SIZES.SMALL} model={pieChartData} />,
			);
			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should render nothing', () => {
			const wrapper = shallow(
				<PieChartButton
					available={false}
					display={PIECHART_SIZES.MEDIUM}
					labelIndex={2}
					model={pieChartData}
				/>,
			);

			expect(wrapper.getElement()).toBeNull();
		});
		it('should trigger onClick', () => {
			const onClick = jest.fn();
			const event = {};
			const wrapper = shallow(
				<PieChartButton
					label="my label"
					display={PIECHART_SIZES.SMALL}
					model={pieChartData}
					onClick={onClick}
				/>,
			);

			wrapper
				.find('Button')
				.at(0)
				.simulate('click', event);

			expect(onClick).toHaveBeenCalledWith(event, {
				action: {
					label: 'my label',
				},
				model: pieChartData,
			});
		});

		it('should render a PieChartButton with an overlay', () => {
			const overlayComponent = <div>I am an overlay</div>;
			const wrapper = shallow(
				<PieChartButton
					display={PIECHART_SIZES.MEDIUM}
					labelIndex={2}
					model={pieChartData}
					overlayComponent={overlayComponent}
					overlayId="id-popover"
				/>,
			);

			expect(wrapper.getElement()).toMatchSnapshot();
		});
		it('should called refs methods', () => {
			// given
			const overlayComponent = <div className="fake-overlay" />;
			// when
			const myButtonRef = jest.fn();
			const myOverlayRef = jest.fn();
			mount(
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
		mount(<OverlayCmp />);
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
