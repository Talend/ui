import React from 'react';
import {
	useTabState,
	Tab as ReakitTab,
	TabList as ReakitTabList,
	TabPanel as ReakitTabPanel,
} from 'reakit/Tab';

const TabsContext = React.createContext();

function Tabs({ children, ...initialState }) {
	const tab = useTabState(initialState);
	const value = React.useMemo(() => tab, Object.values(tab));
	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

function Tab(props) {
	const tab = React.useContext(TabsContext);
	return <ReakitTab {...tab} {...props} />;
}

function TabList(props) {
	const tab = React.useContext(TabsContext);
	return <ReakitTabList {...tab} {...props} />;
}

function TabPanel(props) {
	const tab = React.useContext(TabsContext);
	return <ReakitTabPanel {...tab} {...props} />;
}

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;

export default Tabs;
