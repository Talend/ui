import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classNames from 'classnames';
import Inject from '../../Inject';

import theme from './ActionButtonOverlay.scss';

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
function getOverlayElement(innerElement) {
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
function getContainerElement(overlayElement) {
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
 * @return {string| null}                  return the adapted placement
 *   - if enough space in the current placement: return null
 *   - if placement is top and enough space to the bottom: return bottom
 *   - if placement is bottom and enough space to the top: return top
 *   - if no space to the top or the bottom keep the initial placement and return null
 */
export function getAdaptedPlacement(triggerRect, overlayRect, containerRect, currentPlacement) {
	if (canInsertElementInWrapper(overlayRect, containerRect)) return null;

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

	return null;
}

export default class ActionButtonOverlay extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		getComponent: PropTypes.func,
		onClick: PropTypes.func,
		overlayComponent: Inject.getReactElement.propTypes,
		overlayId: PropTypes.string,
		overlayPlacement: OverlayTrigger.propTypes.placement,
		overlayRef: PropTypes.func,
		preventScrolling: PropTypes.bool,
	};

	static defaultProps = {
		preventScrolling: false,
	};

	constructor(props) {
		super(props);

		this.onClick = this.handleOverlayPlacement.bind(this);
		this.setTriggerElement = this.setTriggerElement.bind(this);
		this.onExited = this.onExited.bind(this);
		this.state = {
			placement: this.props.overlayPlacement,
		};
	}

	onExited() {
		this.setState({
			placement: this.props.overlayPlacement,
		});
	}

	setTriggerElement(element) {
		this.triggerElement = element;
	}

	handleOverlayPlacement(event) {
		const overlayElement = getOverlayElement(event);
		const containerElement = getContainerElement(overlayElement);

		const containerRect = containerElement.getBoundingClientRect();
		const overlayRect = overlayElement.getBoundingClientRect();
		const triggerRect = this.triggerElement.getBoundingClientRect();

		this.setState(previousState => {
			const adaptedPlacement = getAdaptedPlacement(
				triggerRect,
				overlayRect,
				containerRect,
				previousState.placement,
			);
			if (!adaptedPlacement) {
				return null;
			}

			return {
				placement: adaptedPlacement,
			};
		});
	}

	render() {
		const props = {};

		if (this.props.preventScrolling) {
			props.container = this;
		}

		return (
			<span
				ref={this.setTriggerElement}
				className={classNames(theme['tc-action-button-positionned'])}
			>
				<OverlayTrigger
					placement={this.state.placement}
					onEntering={this.onClick}
					onExited={this.onExited}
					onClick={this.props.onClick}
					overlay={
						<Popover id={this.props.overlayId}>
							{Inject.getReactElement(this.props.getComponent, this.props.overlayComponent)}
						</Popover>
					}
					ref={this.props.overlayRef}
					rootClose
					trigger="click"
					{...props}
				>
					{this.props.children}
				</OverlayTrigger>
			</span>
		);
	}
}
