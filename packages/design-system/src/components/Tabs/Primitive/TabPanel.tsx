import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';
import { DataAttributes } from '../../../types';
import { TabState } from './TabState';

export type TabPanelPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactNode | ReactNode[] };

type TabPanelPropsTypes = TabPanelPropsTypesWithoutState &
	TabState & {
		id: string;
	};

const TabPanel = forwardRef((props: TabPanelPropsTypes, ref: Ref<HTMLDivElement>) => {
	if (props.id !== props.selectedId) {
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
