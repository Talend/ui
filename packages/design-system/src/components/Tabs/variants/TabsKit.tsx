import { createContext, forwardRef, ReactNode, Ref, useContext, useMemo } from 'react';
import { TabStateReturn, useTabState } from '../Primitive/TabState';
import TabList from '../Primitive/TabList';
import Tab from '../Primitive/Tab';
import TabPanel from '../Primitive/TabPanel';

export type TabsProps = {
	children: ReactNode | ReactNode[];
	selectedId?: string;
};

const TabsContext = createContext<TabStateReturn | null>(null);

const Tabs = ({ children, ...initialState }: TabsProps) => {
	const tabs = useTabState(initialState);
	const value = useMemo(() => tabs, [tabs]);
	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

type TabComponentProps = {
	size?: 'M' | 'L';
	id: string;
	tooltip?: string;
	children: ReactNode | ReactNode[];
};

const TabComponent = forwardRef((props: TabComponentProps, ref: Ref<HTMLButtonElement>) => {
	const tabs = useContext(TabsContext);
	if (!tabs) {
		return null;
	}
	return <Tab {...tabs} ref={ref} {...props} />;
});
TabComponent.displayName = 'Tab';

type TabPanelProps = {
	id: string;
	children: ReactNode | ReactNode[];
};

const TabPanelComponent = forwardRef((props: TabPanelProps, ref: Ref<HTMLDivElement>) => {
	const tab = useContext(TabsContext);
	if (!tab) {
		return null;
	}
	return <TabPanel {...tab} ref={ref} {...props} />;
});
TabPanelComponent.displayName = 'TabPanel';

Tabs.Tab = TabComponent;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanelComponent;

export default Tabs;
