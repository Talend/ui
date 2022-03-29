import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { IconName } from '@talend/icons';
import { StackVertical } from '../../Stack';

import styles from './EmptyStatePrimitive.module.scss';
import Link from '../../Link';
import { ButtonPrimary } from '../../Button';

export type EmptyStatePrimitiveProps = Omit<
	HTMLAttributes<HTMLElement>,
	'className' | 'style' | 'title'
> & {
	title: string;
	description?: string;
	docLinkURL?: string;
	callback?: {
		label: string;
		action: () => void;
		icon?: IconName;
	};
	illustration?: ReactElement;
};

const EmptyStatePrimitive = forwardRef((props: EmptyStatePrimitiveProps, ref: Ref<HTMLElement>) => {
	const { title, description, docLinkURL, illustration, callback, ...commonProps } = props;

	return (
		<article {...commonProps} ref={ref} className={styles.emptyState}>
			<StackVertical gap="M" justify="center" align="center">
				{illustration}
				<h3 className={styles.title}>{title}</h3>
				{description && <p className={styles.description}>{description}</p>}
				{callback && (
					<ButtonPrimary icon={callback.icon} onClick={callback.action}>
						{callback.label}
					</ButtonPrimary>
				)}
				{docLinkURL && (
					<Link href={docLinkURL} target="_blank">
						Learn more
					</Link>
				)}
			</StackVertical>
		</article>
	);
});

export default EmptyStatePrimitive;
