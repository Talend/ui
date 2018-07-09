const OVERLAY_PLACEMENT_TOP = 'top';
const OVERLAY_PLACEMENT_BOTTOM = 'bottom';
const BODY = 'BODY';
const OVERLAY_CONTAINER_CLASS_NAME = 'tc-dropdown-container';
const REACT_BOOSTRAP_OVERLAY_CLASS_NAME = 'popover';

/**
 * getOverlayElement - return the overlay element
 *
 * @param  {Element} innerElement the root element of the action
 * @return {Element}              return the overlay component
 */
export function getOverlayElement(innerElement) {
	let overlayElement = innerElement;
	while (!overlayElement.classList.contains(REACT_BOOSTRAP_OVERLAY_CLASS_NAME)) {
		overlayElement = overlayElement.parentElement;
	}
	return overlayElement;
}

/**
 * getContainerElement - Look up the container in the parent overlay
 *
 * @param  {Element} overlayElement overlay element
 * @return {Element}                 return the container if exists
 */
export function getContainerElement(overlayElement) {
	let containerElement = overlayElement;
	do {
		containerElement = containerElement.parentElement;
	} while (
		containerElement &&
		containerElement.tagName !== BODY &&
		!containerElement.classList.contains(OVERLAY_CONTAINER_CLASS_NAME)
	);
	return containerElement;
}

/**
 * canInsertElementInWrapper - check if the element is correctly inserted in the wrapper
 *
 * @param  {DOMRect} insertRect element to insert
 * @param  {DOMRect} containerRect container of the element
 * @return {boolean}               return true if the element is correctly
 */
export function canInsertElementInWrapper(insertRect, containerRect) {
	return containerRect.top <= insertRect.top && containerRect.bottom >= insertRect.bottom;
}

/**
 * getReverseElement - Return the bound of the reversed element with the
 * height of the arrow on the bound of the reversed element
 *
 * @param  {DOMRect} triggerRect   bound of the trigger element
 * @param  {DOMRect} overlayRect   bound of the overlay element
 * @param  {string} initialPlacement initial placement top or bottom
 * @return {DOMRect}               bound of the reversed element
 */
export function getReverseElement(triggerRect, overlayRect, initialPlacement) {
	let top;
	let bottom;

	if (initialPlacement === OVERLAY_PLACEMENT_BOTTOM) {
		top = triggerRect.top - overlayRect.height - (overlayRect.top - triggerRect.bottom);
		bottom = top + overlayRect.height;
	} else {
		bottom = triggerRect.bottom + overlayRect.height + (triggerRect.top - overlayRect.bottom);
		top = bottom - overlayRect.height;
	}

	return {
		top,
		bottom,
	};
}

/**
 * getAdaptedPlacement - return the adapted placement for the overlay
 * @param  {DOMRect} triggerRect   bound of the trigger element
 * @param  {DOMRect} overlayRect   bound of the overlay element
 * @param  {DOMRect} containerRect    bound of the container element
 * @param  {string} currentPlacement current placement of the overlay
 * @return {string}                  return the adapted placement
 *   - if enough space in the current placement: return the current placement
 *   - if placement is top and enough space to the bottom: return bottom
 *   - if placement is bottom and enough space to the top: return top
 *   - if no space to the top or the bottom return the current placement
 */
export function getAdaptedPlacement(triggerRect, overlayRect, containerRect, currentPlacement) {
	if (canInsertElementInWrapper(overlayRect, containerRect)) return currentPlacement;

	const reversedElementRect = getReverseElement(triggerRect, overlayRect, currentPlacement);

	if (
		currentPlacement === OVERLAY_PLACEMENT_BOTTOM &&
		canInsertElementInWrapper(reversedElementRect, containerRect)
	) {
		return OVERLAY_PLACEMENT_TOP;
	}

	if (
		currentPlacement === OVERLAY_PLACEMENT_TOP &&
		canInsertElementInWrapper(reversedElementRect, containerRect)
	) {
		return OVERLAY_PLACEMENT_BOTTOM;
	}

	return currentPlacement;
}
