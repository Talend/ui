export interface EnumerationItem {
	id: string;
	label: string;
}

export interface EnumerationProps {
	items: EnumerationItem[];
	loadMoreRows: (params: { startIndex: number; stopIndex: number }) => Promise<void>;
	onImport?: (...params: unknown[]) => void;
	title: string;
}

export enum EnumerationMode {
	CREATE = 'create',
	EDIT = 'edit',
	VIEW = 'view',
}
