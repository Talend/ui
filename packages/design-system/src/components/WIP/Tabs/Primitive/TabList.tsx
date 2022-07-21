import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { TabList as ReakitTabList, TabState } from 'reakit';
import { DataAttributes } from '../../../../types';
import { StackHorizontal } from '../../../Stack';

export type TabListPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactElement | ReactElement[] };

type TabListPropsTypes = TabListPropsTypesWithoutState & TabState;

const TabList = forwardRef((props: TabListPropsTypes, ref: Ref<HTMLDivElement>) => {
	return (
		<ReakitTabList {...props} ref={ref} as={StackHorizontal} gap="M">
			{props.children}
		</ReakitTabList>
	);
});

TabList.displayName = 'TabList';

export default TabList;
