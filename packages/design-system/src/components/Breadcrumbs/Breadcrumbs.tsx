import React, { useCallback, forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';

import styles from './Breadcrumbs.module.scss';
import Link from '../Link';
import Dropdown from '../Dropdown/Dropdown';
import { ButtonTertiary } from '../Button';
import { StackHorizontal } from '../Stack';

type BreadCrumbItems = {
	label: string;
	href: string;
	target?: '_blank' | '_self';
}[];

type BreadCrumbProps = Omit<HTMLAttributes<HTMLElement>, 'className'> & {
	as?: 'a' | ReactElement;
	items: BreadCrumbItems;
};

const Breadcrumbs = forwardRef(
	({ as = 'a', items, ...rest }: BreadCrumbProps, ref: Ref<HTMLElement>) => {
		const maxItemLength = 4;

		const buildEntries = useCallback(() => {
			if (items.length > maxItemLength) {
				const origin = items[0];
				const suffix = items.slice(-2);
				const collapsed = items.slice(1, items.length - 2);

				return (
					<>
						<li className={styles.entry}>
							<Link href={origin.href} as={as} target={origin.target}>
								{origin.label}
							</Link>
						</li>

						<li className={styles.entry}>
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
						</li>

						{suffix.map((entry, index) => (
							<li className={styles.entry} key={entry.href}>
								<Link
									href={entry.href}
									target={entry.target}
									as={as}
									aria-current={index === suffix.length - 1 ? 'page' : undefined}
								>
									{entry.label}
								</Link>
							</li>
						))}
					</>
				);
			}

			return items.map((entry, index) => (
				<li className={styles.entry} key={entry.href}>
					<Link
						href={entry.href}
						as={as}
						aria-current={index === items.length - 1 ? 'page' : undefined}
					>
						{entry.label}
					</Link>
				</li>
			));
		}, [items]);

		return (
			<nav {...rest} className={styles.breadcrumb} ref={ref} aria-label="breadcrumb">
				<StackHorizontal gap="S" as="ul" justify="start" align="center">
					{buildEntries()}
				</StackHorizontal>
			</nav>
		);
	},
);

export default Breadcrumbs;
