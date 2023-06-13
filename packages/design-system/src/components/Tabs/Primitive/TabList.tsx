import { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { DataAttributes } from '../../../types';
import { StackHorizontal } from '../../Stack';
import { TabState } from './TabState';

export type TabListPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactElement | ReactElement[] };

type TabListPropsTypes = TabListPropsTypesWithoutState;

const TabList = forwardRef((props: TabListPropsTypes, ref: Ref<HTMLDivElement>) => {
	return (
		<StackHorizontal role="tablist" {...props} ref={ref} gap="M">
			{props.children}
		</StackHorizontal>
	);
});

TabList.displayName = 'TabList';

export default TabList;
