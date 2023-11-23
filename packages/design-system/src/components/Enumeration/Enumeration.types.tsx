export interface EnumerationProps {
	error?: string;
	id: string;
	items: string[];
	loadMoreRows?: (params: { startIndex: number; stopIndex: number }) => Promise<void>;
	onChange: (items: string[]) => void;
	onCreate?: (value: string) => Promise<unknown>;
	onEdit?: (value: string) => Promise<unknown>;
	onImport?: (data: string[]) => void;
	onRemove?: (entries: string[]) => Promise<unknown>;
	title: string;
}

export interface UiEnumerationItem {
	value: string;
	isToAnimate: boolean;
}

export enum EnumerationMode {
	CREATE = 'create',
	EDIT = 'edit',
	VIEW = 'view',
}
