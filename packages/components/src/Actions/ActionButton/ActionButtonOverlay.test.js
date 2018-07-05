import React from 'react';
import { shallow } from 'enzyme';
import ActionButtonOverlay, {
	getReverseElement,
	canInsertElementInWrapper,
	getAdaptedPlacement,
} from './ActionButtonOverlay.component';

function getDOMRect(top, bottom, height) {
	return {
		bottom,
		height,
		top,
	};
}

describe('getAdaptedPlacement', () => {
	it('should return null to do nothing', () => {
		const triggerElementRect = getDOMRect(100, 150, 50);
		const overlayElementRect = getDOMRect(170, 270, 100);
		const containerElementRect = getDOMRect(0, 270);
		const currentPlacement = 'bottom';

		expect(
			getAdaptedPlacement(
				triggerElementRect,
				overlayElementRect,
				containerElementRect,
				currentPlacement,
			),
		).toBe(null);
	});

	it('should return the adapted placement to top', () => {
		const triggerElementRect = getDOMRect(120, 170, 50);
		const overlayElementRect = getDOMRect(190, 290, 100);
		const containerElementRect = getDOMRect(0, 270);
		const currentPlacement = 'bottom';

		expect(
			getAdaptedPlacement(
				triggerElementRect,
				overlayElementRect,
				containerElementRect,
				currentPlacement,
			),
		).toBe('top');
	});

	it('should return the adapted placement to bottom', () => {
		const triggerElementRect = getDOMRect(100, 150, 50);
		const overlayElementRect = getDOMRect(-20, 80, 100);
		const containerElementRect = getDOMRect(0, 270);
		const currentPlacement = 'top';

		expect(
			getAdaptedPlacement(
				triggerElementRect,
				overlayElementRect,
				containerElementRect,
				currentPlacement,
			),
		).toBe('bottom');
	});
});

describe('canInsert', () => {
	it('should insert the element', () => {
		const insertElementRect = getDOMRect(0, 200);
		const wrapperElementRect = getDOMRect(0, 200);
		expect(canInsertElementInWrapper(insertElementRect, wrapperElementRect)).toBe(true);
	});

	it('should not insert the element when overflow in the bottom', () => {
		const insertElementRect = getDOMRect(150, 201);
		const wrapperElementRect = getDOMRect(0, 200);
		expect(canInsertElementInWrapper(insertElementRect, wrapperElementRect)).toBe(false);
	});

	it('should not insert the element when overflow in the top', () => {
		const insertElementRect = getDOMRect(-1, 150);
		const wrapperElementRect = getDOMRect(0, 200);
		expect(canInsertElementInWrapper(insertElementRect, wrapperElementRect)).toBe(false);
	});
});

describe('getReverse', () => {
	it('should return the reversed component to up', () => {
		const triggerElementRect = getDOMRect(100, 150, 50);
		const overlayElementRect = getDOMRect(170, 270, 100);
		expect(getReverseElement(triggerElementRect, overlayElementRect, 'bottom')).toEqual({
			top: -20,
			bottom: 80,
		});
	});
	it('should return the reversed component to bottom', () => {
		const triggerElementRect = getDOMRect(100, 150, 50);
		const overlayElementRect = getDOMRect(-20, 80, 100);
		expect(getReverseElement(triggerElementRect, overlayElementRect, 'top')).toEqual({
			top: 170,
			bottom: 270,
		});
	});
});

describe('ActionButtonOverlay', () => {
	it('should wrap the children with an overlay', () => {
		const Overlay = <div>Overlay</div>;
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

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should prevent the scrolling', () => {
		const Overlay = <div>Overlay</div>;
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent={Overlay} preventScrolling>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});

	it('should inject the overlay', () => {
		const Overlay = <div>Overlay</div>;
		const wrapper = shallow(
			<ActionButtonOverlay overlayComponent="Overlay" getComponent={() => Overlay}>
				<div>wrap me</div>
			</ActionButtonOverlay>,
		);

		expect(wrapper.getElement()).toMatchSnapshot();
	});
});
