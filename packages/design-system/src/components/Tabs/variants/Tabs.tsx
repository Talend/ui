import { TabsProvider } from './Primitive/TabsProvider';
import { Tabs as TabList, Tab } from './Primitive/Tabs';
import { TabPanel } from './Primitive/TabPanel';

type TabTitlePropTypes = {
	id?: string;
	title: string;
	icon?: string;
	tag?: string | number;
	tooltip?: string;
	disabled?: boolean;
};
type TabItemPropTypes = {
	tabTitle: string | TabTitlePropTypes;
	tabContent: React.ReactNode;
};

export type TabsProps = {
	tabs: TabItemPropTypes[];
	defaultActiveKey?: string;
	size?: 'S' | 'M' | 'L';
};

export function Tabs(props: TabsProps) {
	if (props.tabs) {
		return (
			<TabsProvider
				size={props.size}
				defaultActiveKey={
					props.defaultActiveKey || props.tabs[0].tabTitle?.id || props.tabs[0].tabTitle
				}
			>
				<TabList>
					{props.tabs.map((tab: TabItemPropTypes, index: number) => (
						<Tab
							key={index}
							aria-controls={tab.tabTitle?.id || tab.tabTitle}
							title={tab.tabTitle?.title || tab.tabTitle}
							icon={tab.tabTitle?.icon}
							tag={tab.tabTitle?.tag}
							tooltip={tab.tabTitle?.tooltip}
							disabled={tab.tabTitle?.disabled}
						/>
					))}
				</TabList>
				{props.tabs.map((tab: TabItemPropTypes, index: number) => (
					<TabPanel key={index} id={tab.tabTitle?.id || tab.tabTitle}>
						{tab.tabContent}
					</TabPanel>
				))}
			</TabsProvider>
		);
	}
	return null;
}

Tabs as typeof Tabs & {
	Container: typeof TabsProvider;
	List: typeof TabList;
	Panel: typeof TabPanel;
	Tab: typeof Tab;
};

Tabs.Container = TabsProvider;
Tabs.List = TabList;
Tabs.Panel = TabPanel;
Tabs.Tab = Tab;
