import type { HTMLAttributes, ReactElement, PropsWithChildren } from 'react';
import classnames from 'classnames';

import { Grid } from './Grid';

import styles from './Use.module.scss';

type BlockTypes = {
	title: string;
	children: ReactElement | ReactElement[] | HTMLCollection;
} & HTMLAttributes<HTMLDivElement>;

const Block = ({ title, children, className, ...rest }: BlockTypes) => {
	return (
		<div className={classnames(styles.block, className)} {...rest}>
			<strong className={styles.block__title}>{title}</strong>
			{children}
		</div>
	);
};

const Do = ({ children, ...rest }: Omit<BlockTypes, 'title'>) => {
	return (
		<Block className={styles.block_do} title="Do" {...rest}>
			{children}
		</Block>
	);
};

const Dont = ({ children, ...rest }: Omit<BlockTypes, 'title'>) => {
	return (
		<Block className={styles.block_dont} title="Don't" {...rest}>
			{children}
		</Block>
	);
};

export const Use = ({ children }: PropsWithChildren<HTMLDivElement>) => (
	<Grid columns={2}>{children}</Grid>
);

Use.Do = Do;
Use.Dont = Dont;
