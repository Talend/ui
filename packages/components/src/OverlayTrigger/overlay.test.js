import { JSDOM } from 'jsdom';
import {
	getReverseElement,
	canInsertElementInWrapper,
	getAdaptedPlacement,
	getOverlayElement,
	getContainerElement,
} from './overlay';

function getDOMRect(top, bottom, height) {
	return {
		bottom,
		height,
		top,
	};
}

const dom = new JSDOM(
	'<!DOCTYPE html><div class="tc-dropdown-container"><div class="popover"><span></span></div></div>',
);

describe('getOverlayElement', () => {
	it('should return the overlay element in the parent', () => {
		expect(
			getOverlayElement(dom.window.document.querySelector('span')).classList.contains('popover'),
		).toBe(true);
	});
});

describe('getOverlayElement', () => {
	it('should return the container element in the parent', () => {
		expect(
			getContainerElement(dom.window.document.querySelector('span')).classList.contains(
				'tc-dropdown-container',
			),
		).toBe(true);
	});
});

describe('getAdaptedPlacement', () => {
	it('should return the current placement when the element get in the container', () => {
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
		).toBe('bottom');
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

	it(`should return the current placement when the element
		and the reverse element do not get in the container`, () => {
		const triggerElementRect = getDOMRect(100, 150, 50);
		const overlayElementRect = getDOMRect(-20, 80, 100);
		const containerElementRect = getDOMRect(0, 220);
		const currentPlacement = 'top';

		expect(
			getAdaptedPlacement(
				triggerElementRect,
				overlayElementRect,
				containerElementRect,
				currentPlacement,
			),
		).toBe('top');
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
