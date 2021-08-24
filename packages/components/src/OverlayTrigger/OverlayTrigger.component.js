import React, { cloneElement } from 'react';
import PropTypes from 'prop-types';
import BaseOverlayTrigger from 'react-bootstrap/lib/OverlayTrigger';
import Popover from 'react-bootstrap/lib/Popover';
import classNames from 'classnames';
import Inject from '../Inject';
import { getOverlayElement, getContainerElement, getAdaptedPlacement } from './overlay';

import theme from './OverlayTrigger.scss';

export const overlayPropTypes = {
	overlayComponent: Inject.getReactElement.propTypes,
	overlayId: PropTypes.string,
	overlayPlacement: BaseOverlayTrigger.propTypes.placement,
	overlayRef: PropTypes.func,
	preventScrolling: PropTypes.bool,
};

function getPlacement(initialOverlayElement, triggerElement, currentPlacement) {
	const overlayElement = getOverlayElement(initialOverlayElement);
	const containerElement = getContainerElement(overlayElement);

	const containerRect = containerElement.getBoundingClientRect();
	const overlayRect = overlayElement.getBoundingClientRect();
	const triggerRect = triggerElement.getBoundingClientRect();

	return getAdaptedPlacement(triggerRect, overlayRect, containerRect, currentPlacement);
}

export default class OverlayTrigger extends React.Component {
	static propTypes = {
		children: PropTypes.element,
		getComponent: PropTypes.func,
		onClick: PropTypes.func,
		trigger: PropTypes.oneOfType([PropTypes.string, PropTypes.arrayOf(PropTypes.string)]),
		...overlayPropTypes,
	};

	static defaultProps = {
		preventScrolling: false,
		trigger: 'click',
	};

	constructor(props) {
		super(props);

		this.setTriggerElement = this.setTriggerElement.bind(this);
		this.onEntering = this.onEntering.bind(this);
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

	onEntering(initialOverlayElement) {
		this.setState(previousState => {
			const adaptedPlacement = getPlacement(
				initialOverlayElement,
				this.triggerElement,
				previousState.placement,
			);
			if (adaptedPlacement === previousState.placement) {
				return null;
			}

			return {
				placement: adaptedPlacement,
			};
		});
	}

	setTriggerElement(element) {
		this.triggerElement = element;
	}

	render() {
		const popoverContent = this.props.getComponent
			? Inject.getReactElement(this.props.getComponent, this.props.overlayComponent)
			: this.props.overlayComponent;
		const props = {
			placement: this.state.placement,
			onClick: this.props.onClick,
			onEntering: this.onEntering,
			onExited: this.onExited,
			overlay: <Popover id={this.props.overlayId}>{popoverContent}</Popover>,
			ref: this.props.overlayRef,
			rootClose: true,
			trigger: this.props.trigger,
		};
		const tooltipProps = {
			onMouseOver: this.props.onMouseOver,
			onMouseOut: this.props.onMouseOut,
			onFocus: this.props.onFocus,
			onBlur: this.props.onBlur,
		};

		if (this.props.preventScrolling) {
			props.container = this;
		}

		return (
			<span
				ref={this.setTriggerElement}
				className={classNames(
					theme['tc-action-button-positionned'],
					'tc-action-button-positionned',
				)}
			>
				<BaseOverlayTrigger {...props}>
					{cloneElement(this.props.children, tooltipProps)}
				</BaseOverlayTrigger>
			</span>
		);
	}
}
