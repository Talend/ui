import React from 'react';
import { TabInitialState, useTabState } from 'reakit';

import * as S from './Tabs.style';

export type TabsProps = React.PropsWithChildren<any> & {
	initialState?: TabInitialState;
};

const TabsContext = React.createContext({});

const Tabs = ({ children, ...initialState }: TabsProps) => {
	const tab = useTabState(initialState);
	// eslint-disable-next-line
	const value = React.useMemo(() => tab, Object.values(tab));
	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
};

const TabList = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>((props, ref) => {
	const tab = React.useContext(TabsContext);
	return <S.TabList {...tab} ref={ref} {...props} />;
});

const Tab = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>((props, ref) => {
	const tab = React.useContext(TabsContext);
	return (
		<S.Tab {...tab} ref={ref} {...props}>
			{Object.prototype.hasOwnProperty.call(props, 'aria-describedby') ? (
				<span className="ellipsis">{props.children}</span>
			) : (
				props.children
			)}
		</S.Tab>
	);
});

const TabPanel = React.forwardRef<React.ReactElement, React.PropsWithChildren<any>>(
	(props, ref) => {
		const tab = React.useContext(TabsContext);
		return <S.TabPanel {...tab} ref={ref} {...props} />;
	},
);

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;

export default Tabs;
