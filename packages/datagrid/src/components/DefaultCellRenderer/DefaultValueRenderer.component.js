import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { TooltipTrigger } from '@talend/react-components';
import FormatValue, { hasWhiteSpaceCharacters } from './FormatValue.component';

import theme from './DefaultValueRenderer.scss';

export default class DefaultValueRenderer extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		value: PropTypes.oneOfType([PropTypes.string, PropTypes.bool, PropTypes.number]),
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
			this.setState({ overflowing });
		}
	}

	render() {
		let stringValue;

		if (this.props.value === null) {
			stringValue = '';
		} else {
			stringValue = String(this.props.value);
		}

		const hasWhiteSpace = hasWhiteSpaceCharacters(stringValue);
		const formattedContent = hasWhiteSpace ? <FormatValue value={stringValue} /> : stringValue;

		const content = (
			<div
				ref={this.setDOMElement}
				onMouseOver={this.checkOverflow}
				className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell')}
			>
				{formattedContent}
			</div>
		);

		if (this.state.overflowing) {
			return (
				<TooltipTrigger tooltipPlacement="bottom" label={formattedContent}>
					{content}
				</TooltipTrigger>
			);
		}

		return content;
	}
}
