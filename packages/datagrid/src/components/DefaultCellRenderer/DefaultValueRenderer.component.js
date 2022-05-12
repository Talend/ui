import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import has from 'lodash/has';
import { Tooltip } from '@talend/design-system';
import { FormatValue } from '@talend/react-components';

import theme from './DefaultValueRenderer.scss';

export const DEFAULT_VALUE_PROP_TYPES = PropTypes.oneOfType([
	PropTypes.string,
	PropTypes.bool,
	PropTypes.number,
	PropTypes.shape({
		bytes: PropTypes.string,
	}),
]);

export default class DefaultValueRenderer extends React.Component {
	static propTypes = {
		className: PropTypes.string,
		value: DEFAULT_VALUE_PROP_TYPES,
	};

	static theme = theme;

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

		if (this.props.value === null || this.props.value === undefined) {
			stringValue = '';
		} else if (has(this.props.value, 'bytes')) {
			stringValue = this.props.value.bytes;
		} else {
			stringValue = String(this.props.value);
		}

		const formattedContent = <FormatValue value={stringValue} />;

		const content = (
			// eslint-disable-next-line jsx-a11y/mouse-events-have-key-events
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
				<Tooltip placement="bottom" title={formattedContent}>
					{content}
				</Tooltip>
			);
		}

		return content;
	}
}
