import React from 'react';
import { useTabState } from 'reakit';

import * as S from './Tabs.style';

const TabsContext = React.createContext();

function Tabs({ children, ...initialState }) {
	const tab = useTabState(initialState);
	const value = React.useMemo(() => tab, Object.values(tab));
	return <TabsContext.Provider value={value}>{children}</TabsContext.Provider>;
}

const Tab = React.forwardRef((props, ref) => {
	const tab = React.useContext(TabsContext);
	return (
		<S.Tab {...tab} ref={ref} {...props}>
			{props.hasOwnProperty('aria-describedby') ? (
				<span className="ellipsis">{props.children}</span>
			) : (
				props.children
			)}
		</S.Tab>
	);
});

const TabList = React.forwardRef((props, ref) => {
	const tab = React.useContext(TabsContext);
	return <S.TabList {...tab} ref={ref} {...props} />;
});

const TabPanel = React.forwardRef((props, ref) => {
	const tab = React.useContext(TabsContext);
	return <S.TabPanel {...tab} ref={ref} {...props} />;
});

Tabs.Tab = Tab;
Tabs.TabList = TabList;
Tabs.TabPanel = TabPanel;

export default Tabs;
