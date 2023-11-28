import { useEffect, useState } from 'react';

import { randomUUID } from '@talend/utils';

import { TabPanel, TabPanelPropTypes } from '../Primitive/TabPanel';
import { Tab, Tabs as TabList, TabPropTypes } from '../Primitive/Tabs';
import { TabsProvider, TabsProviderPropTypes } from '../Primitive/TabsProvider';

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
							const { id, ...rest } = tab.tabTitle;
							tabProps['aria-controls'] = id || ids[index];
							Object.assign(tabProps, rest);
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
