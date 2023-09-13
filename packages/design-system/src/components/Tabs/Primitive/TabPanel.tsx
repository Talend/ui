import { forwardRef, ReactNode, Ref } from 'react';

export type TabPanelProps = {
	children: ReactNode;
	id: string;
};

const TabPanel = forwardRef(({ children, id }: TabPanelProps, ref: Ref<HTMLDivElement>) => {
	return (
		<div ref={ref} id={id} role="tabpanel" tabIndex={0}>
			{children}
		</div>
	);
});

TabPanel.displayName = 'TabPanel';

export default TabPanel;
