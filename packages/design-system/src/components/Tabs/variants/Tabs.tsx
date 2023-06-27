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
					return (
						<Tab
							{...tabState}
							size={size}
							key={tab.id}
							{...tab}
							{...rest.tabs[index].tabButtonAttributes}
						/>
					);
				})}
			</TabList>

			{tabState.tabs.map(tab => (
				<TabPanel {...tabState} id={tab.id} key={tab.id}>
					{tab.content}
				</TabPanel>
			))}
		</div>
	);
});

Tabs.displayName = 'Tabs';

export default Tabs;
