import { HTMLAttributes, ReactElement } from 'react';
import classnames from 'classnames';
import styles from './Grid.module.scss';

export const Grid = (
	props: {
		columns?: number;
		children: ReactElement | ReactElement[] | HTMLCollection;
	} & HTMLAttributes<HTMLDivElement>,
) => {
	const { children, columns = 3, className, ...rest } = props;
	return (
		<div
			data-theme="light"
			className={classnames(styles.grid, className)}
			{...rest}
			style={{
				gridTemplateColumns: `repeat(
            auto-fit,
            minmax(${Math.floor(100 / columns) - 10}rem, 1fr)
        )`,
			}}
		>
			{children}
		</div>
	);
};
