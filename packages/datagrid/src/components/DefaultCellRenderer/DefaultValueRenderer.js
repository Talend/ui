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
		const overflowing =
			this.domElement.scrollWidth > this.domElement.clientWidth ||
			this.domElement.scrollHeight > this.domElement.clientHeight + 1;

		if (this.state.overflowing !== overflowing) {
			this.setState(() => ({
				overflowing,
			}));
		}
	}

	render() {
		let tooltipContent;
		if (this.props.label !== undefined) {
			tooltipContent = this.props.label;
		} else {
			tooltipContent = this.props.contentRenderer();
		}

		const content = (
			<div
				ref={this.setDOMElement}
				onMouseOver={this.checkOverflow}
				onFocus={this.checkOverflow}
				className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell')}
			>
				{tooltipContent}
			</div>
		);

		if (!this.state.overflowing) {
			return <span>{content}</span>;
		}
		const tooltipTrigger = {};

		if (this.props.label !== undefined) {
			tooltipTrigger.label = tooltipContent;
		} else if (this.props.contentRenderer) {
			tooltipTrigger.contentRenderer = () => <div>{tooltipContent}</div>;
		}

		return (
			<TooltipTrigger tooltipPlacement="bottom" {...tooltipTrigger}>
				{content}
			</TooltipTrigger>
		);
	}
}
