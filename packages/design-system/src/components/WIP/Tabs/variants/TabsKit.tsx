import { createContext, forwardRef, ReactElement, Ref, useContext, useMemo } from 'react';
import { TabInitialState, TabState, useTabState } from 'reakit';
import TabList, { TabListPropsTypesWithoutState } from '../Primitive/TabList';
import Tab, { TabPropsTypesWithoutState } from '../Primitive/Tab';
import TabPanel, { TabPanelPropsTypesWithoutState } from '../Primitive/TabPanel';

export type TabsProps = {
	children: ReactElement | ReactElement[];
} & TabInitialState;

const TabsContext = createContext<TabState | null>(null);

const Tabs = ({ children, ...initialState }: TabsProps) => {
	const tab = useTabState(initialState);
	const value = useMemo(() => tab, [tab]);
	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

const TabListComponent = forwardRef(
	(props: TabListPropsTypesWithoutState, ref: Ref<HTMLDivElement>) => {
		const tab = useContext(TabsContext);
		if (!tab) {
			return null;
		}
		return <TabList {...tab} ref={ref} {...props} />;
	},
);

const TabComponent = forwardRef((props: TabPropsTypesWithoutState, ref: Ref<HTMLButtonElement>) => {
	const tab = useContext(TabsContext);
	if (!tab) {
		return null;
	}
	return <Tab {...tab} ref={ref} {...props} />;
});

const TabPanelComponent = forwardRef(
	(props: TabPanelPropsTypesWithoutState, ref: Ref<HTMLDivElement>) => {
		const tab = useContext(TabsContext);
		if (!tab) {
			return null;
		}
		return <TabPanel {...tab} ref={ref} {...props} />;
	},
);

Tabs.Tab = TabComponent;
Tabs.TabList = TabListComponent;
Tabs.TabPanel = TabPanelComponent;

export default Tabs;
