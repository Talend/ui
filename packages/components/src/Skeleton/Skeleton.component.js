import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import theme from './Skeleton.scss';

function Skeleton({ type, size, width, height, name, className }) {
	const style = { width, height };
	const classes = classnames(
		theme['tc-skeleton'],
		theme[`tc-skeleton-${type}`],
		theme[`tc-skeleton-${type}-${size}`],
		'tc-skeleton',
		`tc-skeleton-${type}`,
		`tc-skeleton-circle-${size}`,
		className,
	);

	if (type === 'icon') {
		return <Icon className={classes} name={name} />;
	}
	return <span style={style} className={classes} />;
}

Skeleton.propTypes = {
	type: PropTypes.oneOf(['icon', 'circle', 'text', 'button']).isRequired,
	size: PropTypes.oneOf(['extra-large', 'large', 'medium', 'small']),
	width: PropTypes.number,
	height: PropTypes.number,
	name: PropTypes.string,
	className: PropTypes.string,
};

Skeleton.defaultProps = {
	type: 'text',
	size: 'medium',
};

Skeleton.displayName = 'Skeleton';

export default Skeleton;
