import { TabsProvider, TabsProviderPropTypes } from '../Primitive/TabsProvider';
import { Tabs as TabList, Tab, TabPropTypes } from '../Primitive/Tabs';
import { TabPanel, TabPanelPropTypes } from '../Primitive/TabPanel';
import { useEffect, useState } from 'react';
import { randomUUID } from '@talend/utils';

type TabTitlePropTypes = Omit<TabPropTypes, 'aria-controls'> & {
	id?: string;
};

type TabItemPropTypes = {
	tabTitle?: TabTitlePropTypes | string;
	tabContent: React.ReactNode;
};

export type TabsProps = {
	id?: string;
	tabs: TabItemPropTypes[];
	selectedId?: string;
	size?: 'S' | 'M' | 'L';
};

export function Tabs(props: TabsProps) {
	const [ids, setIds] = useState<string[]>([]);
	useEffect(() => {
		if (ids.length !== props.tabs.length) {
			setIds(props.tabs.map(() => randomUUID()));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [props.tabs]);
	if (props.tabs) {
		const tabProviderProps: Partial<TabsProviderPropTypes> = {
			id: props.id,
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
							tabProps['aria-controls'] = ids[index];
							tabProps.title = tab.tabTitle;
						} else if (typeof tab.tabTitle === 'object') {
							tabProps['aria-controls'] = tab.tabTitle.id || ids[index];
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
						tabPanelProps.id = ids[index];
					} else if (typeof tab.tabTitle === 'object') {
						tabPanelProps.id = tab.tabTitle.id || ids[index];
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
