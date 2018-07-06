import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonOverlay from './ActionButtonOverlay.component';

function getDOMRect(top, bottom, height) {
	return {
		bottom,
		height,
		top,
	};
}

jest.mock('./overlay', () => ({
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

const Overlay = <div>Overlay</div>;

describe('ActionButtonOverlay', () => {
	it('should wrap the children with an overlay', () => {
		const overlayPlacement = 'top';
		const wrapper = shallow(
			<ActionButtonOverlay
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement={overlayPlacement}
			>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
		expect(wrapper.state('placement')).toBe(overlayPlacement);
	});

	it('should prevent the scrolling', () => {
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent={Overlay} preventScrolling>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.find('OverlayTrigger').props().container).toBe(wrapper.instance());
	});

	it('should inject the overlay', () => {
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent="Overlay" getComponent={() => Overlay}>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.find('OverlayTrigger').props().overlay).toMatchSnapshot();
	});

	it('should restore the initial placement when the overlay is close', () => {
		const wrapper = shallow(
			<ActionButtonOverlay
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement="top"
			>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);
		wrapper.setState({ placement: 'bottom' });

		expect(
			wrapper
				.find('OverlayTrigger')
				.props()
				.onExited(),
		);
		expect(wrapper.state('placement')).toBe('top');
	});

	it('should determinate the adapted position when the overlay is open', () => {
		const wrapper = shallow(
			<ActionButtonOverlay
				overlayId="myId"
				overlayRef={() => {}}
				overlayComponent={Overlay}
				overlayPlacement="bottom"
			>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);
		wrapper.instance().setTriggerElement({ getBoundingClientRect: () => getDOMRect(100, 150, 50) });

		wrapper
			.find('OverlayTrigger')
			.props()
			.onEntering();

		expect(wrapper.state('placement')).toBe('top');
	});
});
