import React, { PropTypes } from 'react';
import classNames from 'classnames';

/**
 * Higher order header-renderer that wrap the provided header renderer.
 */
function getHeaderRenderer(WrappedComponent, hideHeader) {
	function HeaderRenderer(props) {
		const {
			label,
		} = props;

		const classnames = classNames('ReactVirtualized__Table__headerTruncatedText', 'sr-only');

		return (<span
			className={classnames}
			key="label"
			title={label}
		>
			{label}
		</span>);
	}

	HeaderRenderer.propTypes = {
		...WrappedComponent.propTypes,
		hideHeader: PropTypes.bool,
	};
	HeaderRenderer.displayName = `HeaderRenderer(${WrappedComponent.displayName})`;

	if (!hideHeader) {
		return WrappedComponent;
	}
	return HeaderRenderer;
}


export default getHeaderRenderer;
