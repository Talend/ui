import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger as BaseOverlayTrigger, Popover } from 'react-bootstrap';
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
		...overlayPropTypes,
	};

	static defaultProps = {
		preventScrolling: false,
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
		const props = {
			placement: this.state.placement,
			onEntering: this.onEntering,
			onExited: this.onExited,
			overlay: (
				<Popover id={this.props.overlayId}>
					{Inject.getReactElement(this.props.getComponent, this.props.overlayComponent)}
				</Popover>
			),
			ref: this.props.overlayRef,
			rootClose: true,
			trigger: 'click',
		};

		if (this.props.preventScrolling) {
			props.container = this;
		}

		return (
			<span
				ref={this.setTriggerElement}
				className={classNames(theme['tc-action-button-positionned'])}
			>
				<BaseOverlayTrigger {...props}>{this.props.children}</BaseOverlayTrigger>
			</span>
		);
	}
}
