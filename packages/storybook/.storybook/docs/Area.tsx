import React, { HTMLAttributes } from 'react';
import classnames from 'classnames';
import styles from './Area.module.scss';

const Area = (props: HTMLAttributes<HTMLDivElement>) => {
	const { children, className, ...rest } = props;
	return (
		<div {...rest} className={classnames(styles.area, className)}>
			{children}
		</div>
	);
};

export default Area;
