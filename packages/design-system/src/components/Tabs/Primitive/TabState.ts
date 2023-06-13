import { useState, useEffect } from 'react';
import { randomUUID } from '@talend/utils';
import { DataAttributes } from '../../../types';

export type TabWithIdPropTypes = {
	tabId: string;
	tabTitle: string | { icon?: string; title: string; tag?: string | number; tooltip?: string };
	tabContent: React.ReactNode;
	size?: 'M' | 'L';
	tabButtonAttributes?: DataAttributes;
};

export type TabPropTypes = Omit<TabWithIdPropTypes, 'tabId'> & {
	tabId?: TabWithIdPropTypes['tabId'];
};

export type TabsPropTypes = {
	tabs: TabPropTypes[];
	size?: 'M' | 'L';
};

export type TabState = {
	/**
	 * The current selected tab's `id`.
	 */
	selectedId?: string;
	/**
	 * Lists all the panels.
	 */
	tabs: TabWithIdPropTypes[];
};

export type TabActions = {
	/**
	 * Sets `selectedId`.
	 */
	setSelectedId: (id: string) => void;
};

export type TabInitialState = Partial<TabState>;

export type TabStateReturn = TabState & TabActions;

function getPanels(tabPanels: TabPropTypes[]): TabWithIdPropTypes[] {
	// ensure there is an id for each tab
	return tabPanels.map(panel => {
		const id = panel.tabId ?? `tab-${randomUUID()}`;
		return { ...panel, tabId: id };
	});
}

export function useTabState(initialState?: TabInitialState): TabStateReturn {
	const [panels, setPanels] = useState<TabWithIdPropTypes[]>(getPanels(initialState?.tabs ?? []));
	const [selectedId, setSelectedId] = useState<string | undefined>(
		initialState?.selectedId ?? undefined,
	);

	useEffect(() => {
		// try to detect change in panels
		let hasChanged = false;
		if (panels.length !== initialState?.tabs?.length) {
			hasChanged = true;
		}
		if (panels.some((panel, index) => panel.tabTitle !== initialState?.tabs?.[index].tabTitle)) {
			hasChanged = true;
		}
		if (
			panels.some((panel, index) => panel.tabContent !== initialState?.tabs?.[index].tabContent)
		) {
			hasChanged = true;
		}
		console.log('try to detect change in panels', hasChanged);

		if (hasChanged) {
			setPanels(getPanels(initialState?.tabs ?? []));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [panels, initialState?.tabs]);
	useEffect(() => {
		if (selectedId === undefined) {
			if (panels.length) {
				setSelectedId(panels[0].tabId);
			}
		}
	}, [selectedId, panels]);
	return {
		selectedId,
		setSelectedId,
		tabs: panels,
	};
}
