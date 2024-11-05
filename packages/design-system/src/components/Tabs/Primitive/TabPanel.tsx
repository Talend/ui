import { useContext } from 'react';

import classNames from 'classnames';

import { TabsInternalContext } from './TabsProvider';

import style from './TabStyles.module.scss';

export type TabPanelPropTypes = {
	id: string;
	children: React.ReactNode | React.ReactNode[];
	renderIf?: boolean;
};

export function TabPanel({ children, id, renderIf }: TabPanelPropTypes): JSX.Element {
	const context = useContext(TabsInternalContext);
	if (id !== context?.value && renderIf) {
		return <></>;
	}

	return (
		<div
			id={id}
			role="tabpanel"
			className={classNames(style.tabpanel, { [style['tabpanel--hidden']]: id !== context?.value })}
			tabIndex={0}
		>
			{children}
		</div>
	);
}

TabPanel.displayName = 'TabPanel';
