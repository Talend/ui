import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { useTranslation } from 'react-i18next';
import { StackVertical } from '../../Stack';

import Link from '../../Link';
import { ButtonPrimary } from '../../Button';
import { ButtonPrimaryAsLink } from '../../ButtonAsLink';
import { ButtonPrimaryPropsType } from '../../Button/variations/ButtonPrimary';
import { ButtonPrimaryAsLinkPropsType } from '../../ButtonAsLink/variations/ButtonPrimaryAsLink';

import styles from './EmptyStatePrimitive.module.scss';

type CallbackTypes =
	| (ButtonPrimaryPropsType & { callbackType: 'button' })
	| (ButtonPrimaryAsLinkPropsType & { callbackType: 'link' });

export type EmptyStatePrimitiveProps = Omit<
	HTMLAttributes<HTMLElement>,
	'className' | 'style' | 'title'
> & {
	title: string;
	description?: string;
	docLinkURL?: string;
	callback?: CallbackTypes;
	illustration?: ReactElement;
};

function buildCallBack(callback: CallbackTypes) {
	if (callback.callbackType === 'button') {
		const { children, callbackType, ...rest } = callback;
		return <ButtonPrimary {...rest}>{children}</ButtonPrimary>;
	}

	const { children, callbackType, ...rest } = callback;
	return <ButtonPrimaryAsLink {...rest}>{children}</ButtonPrimaryAsLink>;
}

const EmptyStatePrimitive = forwardRef((props: EmptyStatePrimitiveProps, ref: Ref<HTMLElement>) => {
	const { title, description, docLinkURL, illustration, callback, ...commonProps } = props;
	const { t } = useTranslation();

	return (
		<article {...commonProps} ref={ref} className={styles.emptyState}>
			<StackVertical gap="M" justify="center" align="center">
				{illustration}
				<h3 className={styles.title}>{title}</h3>
				{description && <p className={styles.description}>{description}</p>}
				{callback && buildCallBack(callback)}
				{docLinkURL && (
					<Link href={docLinkURL} target="_blank">
						{t('EMPTY_LEARN_MORE', 'Learn more')}
					</Link>
				)}
			</StackVertical>
		</article>
	);
});

export default EmptyStatePrimitive;
