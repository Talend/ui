import React, { forwardRef, ReactElement, Ref } from 'react';
import { DataAttributes } from '../../../../types';
import { TabInitialState, useTabState } from 'reakit';
import TabList from '../Primitive/TabList';
import Tab, { TabPropsTypesWithoutState } from '../Primitive/Tab';
import TabPanel from '../Primitive/TabPanel';

type TabsPropTypes = {
	tabs: {
		tabTitle: TabPropsTypesWithoutState | string;
		tabContent: ReactElement | ReactElement[];
		tabButtonAttributes?: DataAttributes;
	}[];
	size?: 'M' | 'L';
} & TabInitialState;

const Tabs = forwardRef(
	({ tabs, size = 'M', ...rest }: TabsPropTypes, ref: Ref<HTMLDivElement>) => {
		const tabState = useTabState({ ...rest });

		return (
			<div ref={ref}>
				<TabList {...tabState}>
					{tabs.map((tab, index) => {
						if (typeof tab.tabTitle === 'string') {
							return (
								<Tab {...tabState} {...tab.tabButtonAttributes} size={size} key={index}>
									{tab.tabTitle}
								</Tab>
							);
						}
						return (
							<Tab
								{...tabState}
								size={size}
								key={index}
								{...tab.tabTitle}
								{...tab.tabButtonAttributes}
							/>
						);
					})}
				</TabList>

				{tabs.map((tab, index) => (
					<TabPanel {...tabState} key={index}>
						{tab.tabContent}
					</TabPanel>
				))}
			</div>
		);
	},
);

Tabs.displayName = 'Tabs';

export default Tabs;
