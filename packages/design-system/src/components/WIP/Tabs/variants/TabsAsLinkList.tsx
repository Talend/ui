import React, { forwardRef, Ref } from 'react';
import TabAsLink, { TabAsLinkProps } from '../Primitive/TabAsLink';
import { StackHorizontal } from '../../../Stack';
import { DataAttributes } from '../../../../types';

import styles from './TabsAsLinkList.module.scss';

type TabsAsLinkListProps = {
	tabs: TabAsLinkProps[];
	size?: 'M' | 'L';
} & DataAttributes;

const TabsAsLinkList = forwardRef(
	({ tabs, size = 'M', ...props }: TabsAsLinkListProps, ref: Ref<HTMLUListElement>) => {
		return (
			<div className={styles.tabList}>
				<StackHorizontal gap={size} as={'ul'} {...props} ref={ref}>
					{tabs.map((tab, index) => {
						return (
							<li key={`${index}-tab`}>
								<TabAsLink {...tab} size={size} />
							</li>
						);
					})}
				</StackHorizontal>
			</div>
		);
	},
);

TabsAsLinkList.displayName = 'TabsAsLinkList';

export default TabsAsLinkList;
