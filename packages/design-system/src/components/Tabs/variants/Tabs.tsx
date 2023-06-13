import { forwardRef, Ref } from 'react';
import TabList from '../Primitive/TabList';
import Tab from '../Primitive/Tab';
import TabPanel from '../Primitive/TabPanel';
import { TabsPropTypes, useTabState } from '../Primitive/TabState';

const Tabs = forwardRef(({ size = 'M', ...rest }: TabsPropTypes, ref: Ref<HTMLDivElement>) => {
	const tabState = useTabState({ ...rest });

	return (
		<div ref={ref}>
			<TabList>
				{tabState.tabs.map((tab, index) => {
					if (typeof tab.tabTitle === 'string') {
						return (
							<Tab
								{...tabState}
								{...rest.tabs[index].tabButtonAttributes}
								size={size}
								tabId={tab.tabId}
								key={tab.tabId}
							>
								{tab.tabTitle}
							</Tab>
						);
					}
					return (
						<Tab
							{...tabState}
							size={size}
							key={tab.tabId}
							tabId={tab.tabId}
							{...tab.tabTitle}
							{...rest.tabs[index].tabButtonAttributes}
						/>
					);
				})}
			</TabList>

			{tabState.tabs.map(tab => (
				<TabPanel {...tabState} key={tab.tabId}>
					{tab.tabContent}
				</TabPanel>
			))}
		</div>
	);
});

Tabs.displayName = 'Tabs';

export default Tabs;
