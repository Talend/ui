/**
 * @module react-cmf/lib/Icon
 */
import React from 'react';
import classNames from 'classnames';

/**
 * Icon utility
 * @param  {object} props the props: name (required) + optional className
 * @return {object} ReactElement
 * @example
  <Icon name="user" />
 * @example
  <Icon name="user" className="myiconClass"/>
 */
const Icon = (props) => {
	const iconClasses = classNames(
		'fa',
		props.className,
		props.name
	);
	return (<i className={iconClasses} />);
};

Icon.propTypes = {
	name: React.PropTypes.string.isRequired,
	className: React.PropTypes.string,
};

export default Icon;
