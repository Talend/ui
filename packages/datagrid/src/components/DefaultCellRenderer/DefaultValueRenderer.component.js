import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TooltipTrigger } from '@talend/react-components';
import FormatValue, { hasWhiteSpaceCharacters } from './FormatValue.component';

import theme from './DefaultValueRenderer.scss';

export default class DefaultValueRenderer extends React.Component {
	static propTypes = {
		className: PropTypes.object,
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
		// use a  1.5 ratio to avoid to show the tooltip when the element has slighty overflowed
		const overflowing =
			this.domElement.scrollWidth > this.domElement.clientWidth ||
			this.domElement.scrollHeight > this.domElement.clientHeight * 1.5;

		if (this.state.overflowing !== overflowing) {
			this.setState(() => ({
				overflowing,
			}));
		}
	}

	render() {
		let tooltipContent;
		let hasWhiteSpace = false;
		if (!hasWhiteSpaceCharacters(this.props.value)) {
			tooltipContent = this.props.value;
		} else {
			hasWhiteSpace = true;
			tooltipContent = <FormatValue value={this.props.value} />;
		}

		const content = (
			<div
				ref={this.setDOMElement}
				onMouseOver={this.checkOverflow}
				className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell')}
			>
				{tooltipContent}
			</div>
		);

		if (!this.state.overflowing) {
			return <span>{content}</span>;
		}
		const tooltipTrigger = {};

		if (!hasWhiteSpace) {
			tooltipTrigger.label = tooltipContent;
		} else {
			tooltipTrigger.contentRenderer = () => <div>{tooltipContent}</div>;
		}

		return (
			<TooltipTrigger tooltipPlacement="bottom" {...tooltipTrigger}>
				{content}
			</TooltipTrigger>
		);
	}
}
