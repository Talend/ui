import { forwardRef, HTMLAttributes, ReactElement, Ref } from 'react';
import { DataAttributes } from '../../../types';
import { TabState } from './TabState';

export type TabPanelPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactElement | ReactElement[] };

type TabPanelPropsTypes = TabPanelPropsTypesWithoutState &
	TabState & {
		tabId: string;
	};

const TabPanel = forwardRef((props: TabPanelPropsTypes, ref: Ref<HTMLDivElement>) => {
	if (props.tabId !== props.selectedId) {
		return null;
	}
	return (
		<div {...props} ref={ref} role="tabpanel" tabIndex={0}>
			{props.children}
		</div>
	);
});

TabPanel.displayName = 'Tab';

export default TabPanel;
