import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classNames from 'classnames';
import Inject from '../../Inject';
import { getAdaptedPlacement, getOverlayElement, getContainerElement } from './overlay';

import theme from './ActionButtonOverlay.scss';

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

		this.handleOverlayPlacement = this.handleOverlayPlacement.bind(this);
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
					onEntering={this.handleOverlayPlacement}
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
