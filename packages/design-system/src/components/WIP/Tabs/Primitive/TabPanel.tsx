import React, { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { TabPanel as ReakitTabPanel, TabState } from 'reakit';
import { DataAttributes } from '../../../../types';

export type TabPanelPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactElement | ReactElement[] };

type TabPanelPropsTypes = TabPanelPropsTypesWithoutState & TabState;

const TabPanel = forwardRef((props: TabPanelPropsTypes, ref: Ref<HTMLDivElement>) => {
	return (
		<ReakitTabPanel {...props} ref={ref}>
			{props.children}
		</ReakitTabPanel>
	);
});

TabPanel.displayName = 'Tab';

export default TabPanel;
