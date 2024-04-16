import { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { useTranslation } from 'react-i18next';

import { ButtonPrimary } from '../../Button';
import { ButtonPrimaryPropsType } from '../../Button/variations/ButtonPrimary';
import { ButtonPrimaryAsLink } from '../../ButtonAsLink';
import { ButtonPrimaryAsLinkPropsType } from '../../ButtonAsLink/variations/ButtonPrimaryAsLink';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../../constants';
import { Link } from '../../Link';
import { StackVertical } from '../../Stack';
import styles from './EmptyStatePrimitive.module.css';

type CallbackTypes =
	| (Omit<ButtonPrimaryPropsType<'M'>, 'size'> & { actionType: 'button' })
	| (Omit<ButtonPrimaryAsLinkPropsType<'M'>, 'size'> & { actionType: 'link' });

export type EmptyStatePrimitiveProps = Omit<
	HTMLAttributes<HTMLElement>,
	'className' | 'style' | 'title'
> & {
	title: string;
	description?: string;
	link?: {
		href: string;
		'data-feature'?: string;
	};
	action?: CallbackTypes & { 'data-feature'?: string };
	illustration?: ReactElement;
};

function buildAction(action: CallbackTypes) {
	if (action.actionType === 'button') {
		const { children, actionType, ...rest } = action;
		return <ButtonPrimary {...rest}>{children}</ButtonPrimary>;
	}

	const { children, actionType, ...rest } = action;
	return <ButtonPrimaryAsLink {...rest}>{children}</ButtonPrimaryAsLink>;
}

const EmptyStatePrimitive = forwardRef((props: EmptyStatePrimitiveProps, ref: Ref<HTMLElement>) => {
	const { title, description, link, illustration, action, ...commonProps } = props;
	const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);

	return (
		<article {...commonProps} ref={ref} className={styles.emptyState}>
			<StackVertical gap="M" justify="center" align="center">
				{illustration}
				<StackVertical gap={0} justify="center" align="center">
					<h3 className={styles.title}>{title}</h3>
					{description && <p className={styles.description}>{description}</p>}
				</StackVertical>
				{action && buildAction(action)}
				{link && (
					<Link {...link} target="_blank">
						{t('EMPTY_LEARN_MORE', 'Learn more')}
					</Link>
				)}
			</StackVertical>
		</article>
	);
});
EmptyStatePrimitive.displayName = 'EmptyStatePrimitive';
export default EmptyStatePrimitive;
