import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';

import styles from './Breadcrumbs.module.scss';
import Link from '../Link';
import Dropdown from '../Dropdown/Dropdown';
import { ButtonTertiary } from '../Button';
import { StackHorizontal } from '../Stack';
import Divider from '../Divider';

type BreadcrumbsItem = {
	label: string;
	href: string;
	target?: string;
}[];

type BreadCrumbsProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
	as?: 'a' | ReactElement;
	items: BreadcrumbsItem;
};

const maxBreadcrumbsItemLength = 4;

const Breadcrumbs = forwardRef(
	({ as = 'a', items, ...rest }: BreadCrumbsProps, ref: Ref<HTMLElement>) => {
		const buildEntries = () => {
			if (items.length > maxBreadcrumbsItemLength) {
				const origin = items[0];
				const suffix = items.slice(-2);
				const collapsed = items.slice(1, items.length - 2);

				return (
					<>
						<li className={styles.entry}>
							<StackHorizontal gap="S" align="center" wrap="nowrap">
								<Link href={origin.href} as={as} target={origin.target} data-ellipsis>
									{origin.label}
								</Link>
								<span aria-hidden className={styles.divider}>
									<Divider orientation="vertical" />
								</span>
							</StackHorizontal>
						</li>

						<li className={styles.entry}>
							<StackHorizontal gap="S" align="center" wrap="nowrap">
								<Dropdown
									aria-label="Collapsed links"
									items={collapsed.map(collapsedLinks => ({
										href: collapsedLinks.href,
										label: collapsedLinks.label,
										target: collapsedLinks.target,
										type: 'link',
										as,
									}))}
								>
									<ButtonTertiary isDropdown size="S" onClick={() => {}}>
										...
									</ButtonTertiary>
								</Dropdown>
								<span aria-hidden className={styles.divider}>
									<Divider orientation="vertical" />
								</span>
							</StackHorizontal>
						</li>

						{suffix.map((entry, index) => {
							const { label, ...entryProps } = entry;
							return (
								<li className={styles.entry} key={`${label}-${index}`}>
									<StackHorizontal gap="S" align="center" wrap="nowrap">
										<Link
											{...entryProps}
											as={as}
											aria-current={index === suffix.length - 1 ? 'page' : undefined}
											data-ellipsis
										>
											{label}
										</Link>
										<span aria-hidden className={styles.divider}>
											<Divider orientation="vertical" />
										</span>
									</StackHorizontal>
								</li>
							);
						})}
					</>
				);
			}

			return items.map((entry, index) => (
				<li className={styles.entry} key={entry.href}>
					<StackHorizontal gap="S" align="center" wrap="nowrap">
						<Link
							href={entry.href}
							as={as}
							aria-current={index === items.length - 1 ? 'page' : undefined}
						>
							{entry.label}
						</Link>
						<span aria-hidden className={styles.divider}>
							<Divider orientation="vertical" />
						</span>
					</StackHorizontal>
				</li>
			));
		};

		return (
			<nav {...rest} className={styles.breadcrumbs} ref={ref} aria-label="breadcrumb">
				<StackHorizontal gap="S" as="ul" justify="start" align="center" role="list">
					{buildEntries()}
				</StackHorizontal>
			</nav>
		);
	},
);

export default Breadcrumbs;
