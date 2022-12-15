import React, { HTMLAttributes, ReactElement } from 'react';
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import classnames from 'classnames';

import { SizedIcon } from '@talend/design-system';
import Grid from './Grid';

import styles from './Use.module.scss';

type BlockTypes = {
	title: string;
	icon: IconNameWithSize<'M'>;
	children: ReactElement | ReactElement[] | HTMLCollection;
} & HTMLAttributes<HTMLDivElement>;

const Block = ({ title, icon, children, className, ...rest }: BlockTypes) => {
	return (
		<div className={classnames(styles.block, className)} {...rest}>
			<strong className={styles.block__title}>
				<SizedIcon size="M" name={icon} /> {title}
			</strong>
			{children}
		</div>
	);
};

const Do = ({ children, ...rest }: Omit<BlockTypes, 'icon' | 'title'>) => {
	return (
		<Block className={styles.block_do} title="Do" icon="check-filled" {...rest}>
			{children}
		</Block>
	);
};

const Dont = ({ children, ...rest }: Omit<BlockTypes, 'icon' | 'title'>) => {
	return (
		<Block className={styles.block_dont} title="Don't" icon="square-cross" {...rest}>
			{children}
		</Block>
	);
};

export const Use = ({ children }: React.PropsWithChildren<HTMLDivElement>) => (
	<Grid columns={2}>{children}</Grid>
);

Use.Do = Do;
Use.Dont = Dont;
