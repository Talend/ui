import { useContext } from 'react';
import { TabsInternalContext } from './TabsProvider';

export type TabPanelPropTypes = {
	id: string;
	children: React.ReactNode | React.ReactNode[];
	renderIf?: boolean;
};

export function TabPanel({ children, id, renderIf }: TabPanelPropTypes): JSX.Element {
	const context = useContext(TabsInternalContext);
	const style = {
		display: '',
	};
	if (id !== context?.value) {
		if (renderIf) {
			return <></>;
		}
		style.display = 'none';
	}
	return (
		<div id={id} role="tabpanel" style={style} tabIndex={0}>
			{children}
		</div>
	);
}

TabPanel.displayName = 'TabPanel';
