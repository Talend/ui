import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TooltipTrigger } from '@talend/react-components';

import theme from './DefaultValueRenderer.scss';

export default class DefaultValueRenderer extends React.Component {
	static propTypes = {
		value: PropTypes.string,
	};

	constructor(props) {
		super(props);

		this.state = {
			overflowing: false,
		};

		this.checkOverflow = this.checkOverflow.bind(this);
		this.setDOMElement = this.setDOMElement.bind(this);
	}

	setDOMElement(domElement) {
		this.domElement = domElement;
	}

	checkOverflow() {
		let overflowing;
		if (this.domElement.scrollWidth > this.domElement.clientWidth) {
			overflowing = true;
		} else {
			overflowing = false;
		}

		if (this.state.overflowing !== overflowing) {
			this.setState(() => ({
				overflowing,
			}));
		}
	}

	render() {
		const tooltipContent = this.props.label || this.props.renderValue();

		if (!this.state.overflowing) {
			return (
				<div
					ref={this.setDOMElement}
					onMouseOver={this.checkOverflow}
					onFocus={this.checkOverflow}
					className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell')}
				>
					{tooltipContent}
				</div>
			);
		}
		const tooltipTrigger = {};

		if (this.props.label) {
			tooltipTrigger.label = tooltipContent;
		} else if (this.props.renderValue) {
			tooltipTrigger.renderContentTooltip = () => <div>{tooltipContent}</div>;
		}

		return (
			<TooltipTrigger tooltipPlacement="bottom" {...tooltipTrigger}>
				<div
					ref={this.setDOMElement}
					onMouseOver={this.checkOverflow}
					onFocus={this.checkOverflow}
					className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell')}
				>
					{tooltipContent}
				</div>
			</TooltipTrigger>
		);
	}
}
