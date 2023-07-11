import { useState, useEffect } from 'react';

// eslint-disable-next-line @talend/import-depth
import { IconNameWithSize } from '@talend/icons/dist/typeUtils';
import { randomUUID } from '@talend/utils';

import { DataAttributes } from '../../../types';

export type TabWithIdPropTypes = DataAttributes & {
	id: string;
	title: string;
	icon?: IconNameWithSize<'S'>;
	tag?: string | number;
	tooltip?: string;
	content: React.ReactNode;
	size?: 'M' | 'L';
};

export type TabPropTypes = Omit<TabWithIdPropTypes, 'id'> & {
	id?: TabWithIdPropTypes['id'];
};

export type TabsPropTypes = {
	tabs: TabPropTypes[];
	size?: 'M' | 'L';
	selectedId?: string;
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

export type TabInitialState = {
	selectedId?: string;
	tabs?: TabPropTypes[];
};

export type TabStateReturn = TabState & TabActions;

function getPanels(tabPanels: TabPropTypes[]): TabWithIdPropTypes[] {
	// ensure there is an id for each tab
	return tabPanels.map(panel => {
		const id = panel.id ?? `tab-${randomUUID()}`;
		return { ...panel, id };
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
		if (panels.some((panel, index) => panel.title !== initialState?.tabs?.[index].title)) {
			hasChanged = true;
		}
		if (panels.some((panel, index) => panel.content !== initialState?.tabs?.[index].content)) {
			hasChanged = true;
		}

		if (hasChanged) {
			setPanels(getPanels(initialState?.tabs ?? []));
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialState?.tabs]);

	useEffect(() => {
		if (selectedId !== initialState?.selectedId) {
			setSelectedId(initialState?.selectedId);
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [initialState?.selectedId]);

	useEffect(() => {
		if (selectedId === undefined) {
			if (panels.length) {
				setSelectedId(panels[0].id);
			}
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [panels]);

	return {
		selectedId,
		setSelectedId,
		tabs: panels,
	};
}
