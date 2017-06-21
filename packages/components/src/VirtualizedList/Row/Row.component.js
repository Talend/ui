import React from 'react';
import classNames from 'classnames';

/**
 * Higher order row-renderer that wrap the provided row renderer.
 * It manages row selection classname and inject it to the row renderer props.
 */
function getRowRenderer(WrappedComponent) {
	function Row(props) {
		const { isScrolling, key, style, className } = props;
		const enhancedClassNames = classNames(className);

		if (isScrolling) {
			return (
				<div
					className={enhancedClassNames}
					key={key}
					style={style}
				>
					scrolling ...
				</div>);
		}
		return <WrappedComponent {...props} />;
	}
	Row.propTypes = WrappedComponent.propTypes;
	Row.displayName = `Row(${WrappedComponent.displayName})`;

	return Row;
}

export default getRowRenderer;
