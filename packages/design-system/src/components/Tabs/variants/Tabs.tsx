import { TabsProvider, TabsProviderPropTypes } from '../Primitive/TabsProvider';
import { Tabs as TabList, Tab, TabPropTypes } from '../Primitive/Tabs';
import { TabPanel, TabPanelPropTypes } from '../Primitive/TabPanel';

type TabTitlePropTypes = TabPropTypes & {
	id: string;
};

type TabItemPropTypes = {
	tabTitle?: TabTitlePropTypes | string;
	tabContent: React.ReactNode;
};

export type TabsProps = {
	tabs: TabItemPropTypes[];
	selectedId?: string;
	size?: 'S' | 'M' | 'L';
};

export function Tabs(props: TabsProps) {
	if (props.tabs) {
		const tabProviderProps: Partial<TabsProviderPropTypes> = {
			size: props.size,
			defaultActiveKey: props.selectedId,
		};
		if (props.tabs.length > 0 && !props.selectedId) {
			if (typeof props.tabs[0].tabTitle === 'string') {
				tabProviderProps.defaultActiveKey = props.tabs[0].tabTitle;
			} else if (typeof props.tabs[0].tabTitle === 'object') {
				tabProviderProps.defaultActiveKey = props.tabs[0].tabTitle.id;
			}
		}
		return (
			<TabsProvider {...tabProviderProps}>
				<TabList>
					{props.tabs.map((tab: TabItemPropTypes, index: number) => {
						const tabProps: Partial<TabPropTypes> = {};
						if (typeof tab.tabTitle === 'string') {
							tabProps['aria-controls'] = tab.tabTitle;
							tabProps.title = tab.tabTitle;
						} else if (typeof tab.tabTitle === 'object') {
							tabProps['aria-controls'] = tab.tabTitle.id;
							tabProps.title = tab.tabTitle.title;
							tabProps.icon = tab.tabTitle.icon;
							tabProps.tag = tab.tabTitle.tag;
							tabProps.tooltip = tab.tabTitle.tooltip;
							tabProps.disabled = tab.tabTitle.disabled;
						}
						return <Tab key={index} {...(tabProps as TabPropTypes)} />;
					})}
				</TabList>
				{props.tabs.map((tab: TabItemPropTypes, index: number) => {
					const tabPanelProps: Partial<TabPanelPropTypes> = {};
					if (typeof tab.tabTitle === 'string') {
						tabPanelProps.id = tab.tabTitle;
					} else if (typeof tab.tabTitle === 'object') {
						tabPanelProps.id = tab.tabTitle.id;
					}
					return (
						<TabPanel key={index} {...(tabPanelProps as TabPanelPropTypes)}>
							{tab.tabContent}
						</TabPanel>
					);
				})}
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
