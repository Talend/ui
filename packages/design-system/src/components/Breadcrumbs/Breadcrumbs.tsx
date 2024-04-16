import { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { useTranslation } from 'react-i18next';

import classnames from 'classnames';

import { ButtonTertiary } from '../Button';
import { I18N_DOMAIN_DESIGN_SYSTEM } from '../constants';
import { Divider } from '../Divider';
import { Dropdown } from '../Dropdown/Dropdown';
import { Link } from '../Link';
import { StackHorizontal } from '../Stack';
import { VisuallyHidden } from '../VisuallyHidden';
import styles from './Breadcrumbs.module.css';

type BreadcrumbsLink = {
	label: string;
	href: string;
	target?: string;
	as: never;
};

type BreadcrumbsRouterLink = {
	label: string;
	href: never;
	target?: string;
	as: ReactElement;
};

type BreadcrumbsItem = (BreadcrumbsRouterLink | BreadcrumbsLink)[];

export type BreadCrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'className' | 'style'> & {
	items: BreadcrumbsItem;
};

const maxBreadcrumbsItemLength = 4;

function BreadcrumbLink({
	link,
	isLastLink,
}: {
	link: BreadcrumbsLink | BreadcrumbsRouterLink;
	isLastLink: boolean;
}) {
	return (
		<li className={styles.entry}>
			<StackHorizontal gap="S" align="center" wrap="nowrap">
				<Link
					as={link.as}
					href={link.href}
					target={link.target}
					withEllipsis
					aria-current={isLastLink ? 'page' : undefined}
				>
					{link.label}
				</Link>

				{!isLastLink && (
					<span aria-hidden className={styles.divider}>
						<Divider orientation="vertical" />
					</span>
				)}
			</StackHorizontal>
		</li>
	);
}

export const Breadcrumbs = forwardRef(
	({ items, ...rest }: BreadCrumbsProps, ref: Ref<HTMLElement>) => {
		const { t } = useTranslation(I18N_DOMAIN_DESIGN_SYSTEM);
		const buildEntries = () => {
			if (items.length > maxBreadcrumbsItemLength) {
				const origin = items[0];
				const suffix = items.slice(-2);
				const collapsed = items.slice(1, items.length - 2);

				return (
					<>
						<BreadcrumbLink link={origin} isLastLink={false} />

						<li className={classnames(styles.entry, styles.entry__collapsed)}>
							<StackHorizontal gap="S" align="center" wrap="nowrap">
								<Dropdown
									aria-label={t('COLLAPSED_LINKS_MENU', 'Collapsed links')}
									items={collapsed.map(collapsedLinks => {
										return {
											type: 'link',
											...collapsedLinks,
										};
									})}
								>
									<ButtonTertiary isDropdown size="S" onClick={() => {}}>
										<VisuallyHidden>
											{t('COLLAPSED_LINKS_BUTTON', 'Display collapsed links')}
										</VisuallyHidden>
										<span aria-hidden>…</span>
									</ButtonTertiary>
								</Dropdown>
								<span aria-hidden className={styles.divider}>
									<Divider orientation="vertical" />
								</span>
							</StackHorizontal>
						</li>

						{suffix.map((entry, index) => {
							const isLastEntry = index === suffix.length - 1;
							return (
								<BreadcrumbLink
									link={entry}
									isLastLink={isLastEntry}
									key={`${entry.label}-${index}`}
								/>
							);
						})}
					</>
				);
			}

			return items.map((entry, index) => {
				const isLastEntry = index === items.length - 1;
				return (
					<BreadcrumbLink link={entry} isLastLink={isLastEntry} key={`${entry.label}-${index}`} />
				);
			});
		};

		return (
			<nav
				{...rest}
				className={styles.breadcrumbs}
				ref={ref}
				aria-label={t('BREADCRUMB_LABEL', 'breadcrumb')}
			>
				<StackHorizontal gap="S" as="ul" justify="start" align="center" role="list">
					{buildEntries()}
				</StackHorizontal>
			</nav>
		);
	},
);

Breadcrumbs.displayName = 'Breadcrumbs';
