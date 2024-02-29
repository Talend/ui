export type PanelHeaderAction = {
	icon: string;
	tooltip: string;
	callback: () => unknown;
	id?: string;
	dataFeature?: string;
};
