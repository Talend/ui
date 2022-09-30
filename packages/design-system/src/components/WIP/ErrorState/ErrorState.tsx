import React, { ReactElement } from 'react';

import { ButtonPrimary } from '../../Button';
import { ButtonPrimaryPropsType } from '../../Button/variations/ButtonPrimary';
import Link from '../../Link';
import { LinkProps } from '../../Link/Link';
import { StackVertical } from '../../Stack';

import ErrorIllustration from './illutstrations/ErrorIllustration';

import styles from './ErrorState.module.scss';

type ErrorStatePropTypes = {
	title: string;
	description: string;
	action?: Omit<ButtonPrimaryPropsType<'M'>, 'size'>;
	link?: ReactElement | LinkProps;
};

function ErrorState({ title, description, action, link }: ErrorStatePropTypes) {
	return (
		<article className={styles['error-state']}>
			<StackVertical gap="M" justify="center" align="center">
				<ErrorIllustration />

				<StackVertical gap={0} justify="center" align="center">
					<h3 className={styles['error-state__title']}>{title}</h3>
					<p>{description}</p>
				</StackVertical>

				{action && <ButtonPrimary {...action} />}

				{link && (React.isValidElement(link) ? link : <Link {...(link as LinkProps)} />)}
			</StackVertical>
		</article>
	);
}

export default ErrorState;
