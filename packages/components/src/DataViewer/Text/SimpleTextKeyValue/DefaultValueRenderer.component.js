import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import has from 'lodash/has';
import TooltipTrigger from '../../../TooltipTrigger';
import FormatValue, { hasWhiteSpaceCharacters } from './FormatValue.component';

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
		isValueOverflown: PropTypes.bool,
		isLongValueToggled: PropTypes.bool,
	};

	render() {
		let stringValue;

		if (this.props.value === null || this.props.value === undefined) {
			stringValue = '';
		} else if (has(this.props.value, 'bytes')) {
			stringValue = this.props.value.bytes;
		} else {
			stringValue = String(this.props.value);
		}

		const hasWhiteSpace = hasWhiteSpaceCharacters(stringValue);
		const formattedContent = hasWhiteSpace ? <FormatValue value={stringValue} /> : stringValue;

		const content = (
			<div
				ref={this.setDOMElement}
				className={classNames(theme['td-default-cell'], this.props.className, 'td-default-cell', {
					[theme['shrink-value']]: this.props.isValueOverflown,
					[theme['wrap-value']]: this.props.isLongValueToggled,
				})}
			>
				{formattedContent}
			</div>
		);

		if (this.props.isValueOverflown) {
			return (
				<TooltipTrigger tooltipPlacement="bottom" label={formattedContent}>
					{content}
				</TooltipTrigger>
			);
		}

		return content;
	}
}
