import React from 'react';
import PropTypes from 'prop-types';
import classnames from 'classnames';
import Icon from '../Icon';
import theme from './Skeleton.scss';

const SKELETON_TYPES = {
	icon: 'icon',
	text: 'text',
	button: 'button',
	circle: 'circle',
};

const SKELETON_SIZES = {
	xlarge: 'xlarge',
	large: 'large',
	medium: 'medium',
	small: 'small',
};

// eslint-disable-next-line react/prefer-stateless-function
class Skeleton extends React.Component {
	static displayName = 'Skeleton';
	static defaultProps = {
		type: SKELETON_TYPES.text,
		size: SKELETON_SIZES.medium,
	};
	static propTypes = {
		type: PropTypes.oneOf([
			SKELETON_TYPES.button,
			SKELETON_TYPES.circle,
			SKELETON_TYPES.icon,
			SKELETON_TYPES.text,
		]).isRequired,
		size: PropTypes.oneOf([
			SKELETON_SIZES.xlarge,
			SKELETON_SIZES.large,
			SKELETON_SIZES.medium,
			SKELETON_SIZES.small,
		]),
		width: PropTypes.number,
		height: PropTypes.number,
		name: PropTypes.string,
		className: PropTypes.string,
	};
	static SKELETON_SIZES = SKELETON_SIZES;
	static SKELETON_TYPES = SKELETON_TYPES;

	render() {
		const { type, size, width, height, name, className } = this.props;
		const classes = classnames(
			theme['tc-skeleton'],
			theme[`tc-skeleton-${type}`],
			theme[`tc-skeleton-${type}-${size}`],
			'tc-skeleton',
			`tc-skeleton-${type}`,
			`tc-skeleton-${type}-${size}`,
			className,
		);

		if (type === 'icon') {
			return <Icon className={classes} name={name} />;
		}
		return <span style={{ width, height }} className={classes} />;
	}
}

export default Skeleton;
