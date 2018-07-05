import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classNames from 'classnames';
import Inject from '../../Inject';

import theme from './ActionButtonOverlay.scss';

function getDropdownToggleFromInner(innerElement) {
	let dropdownTrigger = innerElement;
	while (!dropdownTrigger.classList.contains('popover')) {
		dropdownTrigger = dropdownTrigger.parentElement;
	}
	return dropdownTrigger;
}

function getDropdownContainer(dropdownElement) {
	let dropdownContainer = dropdownElement;
	do {
		dropdownContainer = dropdownContainer.parentElement;
	} while (
		dropdownContainer &&
		dropdownContainer.tagName !== 'BODY' &&
		!dropdownContainer.classList.contains('tc-dropdown-container')
	);
	return dropdownContainer;
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

	handleOverlayPlacement(event) {
		const dropdownTrigger = getDropdownToggleFromInner(event);
		const dropdownContainer = getDropdownContainer(dropdownTrigger);

		if (dropdownContainer) {
			const dropdownRect = dropdownTrigger.getBoundingClientRect();
			const containerRect = dropdownContainer.getBoundingClientRect();

			this.setState(previousState => {
				if (previousState.placement === 'bottom' && dropdownRect.bottom > containerRect.bottom) {
					return { placement: 'top' };
				} else if (previousState.placement === 'top' && dropdownRect.top < containerRect.top) {
					return { placement: 'bottom' };
				}
				return null;
			});
		}
	}

	render() {
		const props = {};

		if (this.props.preventScrolling) {
			props.container = this;
		}

		return (
			<span className={classNames(theme['tc-action-button-positionned'])}>
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
