import { createContext, forwardRef, ReactNode, Ref, useContext, useMemo } from 'react';

import { IconNameWithSize } from '@talend/icons';

import TabList from '../Primitive/TabList';
import TabNavigation from '../Primitive/TabNavigation';
import TabPanel from '../Primitive/TabPanel';
import { TabStateReturn, useTabState } from '../Primitive/TabState';

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
};

type TabComponentPropsWithChildren = TabComponentProps & {
	children: ReactNode | ReactNode[];

	title?: never;
	icon?: never;
	tag?: never;
};

type TabComponentPropsWithTitleProps = TabComponentProps & {
	title: string;
	icon?: IconNameWithSize<'S'>;
	tag?: string | number;

	children?: never;
};

const TabComponent = forwardRef(
	(
		props: TabComponentPropsWithChildren | TabComponentPropsWithTitleProps,
		ref: Ref<HTMLButtonElement>,
	) => {
		const tabs = useContext(TabsContext);
		if (!tabs) {
			return null;
		}
		return null; //<TabNavigation {...tabs} ref={ref} {...props} />;
	},
);
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
	return null; //<TabPanel {...tab} ref={ref} {...props} />;
});
TabPanelComponent.displayName = 'TabPanel';

Tabs.Tab = TabComponent;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanelComponent;

export default Tabs;
