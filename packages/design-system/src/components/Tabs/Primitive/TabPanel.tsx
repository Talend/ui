import { forwardRef, HTMLAttributes, ReactNode, Ref } from 'react';

import { DataAttributes } from '../../../types';
import { TabStateReturn } from './TabState';

export type TabPanelPropsTypesWithoutState = DataAttributes &
	HTMLAttributes<HTMLDivElement> & { children: ReactNode | ReactNode[] };

type TabPanelPropsTypes = TabPanelPropsTypesWithoutState &
	TabStateReturn & {
		id: string;
	};

const TabPanel = forwardRef((props: TabPanelPropsTypes, ref: Ref<HTMLDivElement>) => {
	// Extract selectedId & setSelectedId from props to pass rest to div element
	const { selectedId, setSelectedId, ...rest } = props;

	if (props.id !== props.selectedId) {
		return null;
	}

	return (
		<div {...rest} ref={ref} role="tabpanel" tabIndex={0}>
			{props.children}
		</div>
	);
});

TabPanel.displayName = 'Tab';

export default TabPanel;
