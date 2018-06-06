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
			this.setState({ overflowing });
		}
	}

	render() {
		const hasWhiteSpace = hasWhiteSpaceCharacters(this.props.value);
		const formattedContent = hasWhiteSpace ? (
			<FormatValue value={this.props.value} />
		) : (
			this.props.value
		);

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
