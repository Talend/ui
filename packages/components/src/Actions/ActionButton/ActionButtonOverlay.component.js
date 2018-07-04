import React from 'react';
import PropTypes from 'prop-types';
import { OverlayTrigger, Popover } from 'react-bootstrap';
import classNames from 'classnames';
import Inject from '../../Inject';

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

	render() {
		const props = {};

		if (this.props.preventScrolling) {
			props.container = this;
		}

		return (
			<span className={classNames(theme['tc-action-button-positionned'])}>
				<OverlayTrigger
					placement={this.props.overlayPlacement}
					overlay={
						<Popover id={this.props.overlayId}>
							{Inject.getReactElement(this.props.getComponent, this.props.overlayComponent)}
						</Popover>
					}
					onClick={this.props.onClick}
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
