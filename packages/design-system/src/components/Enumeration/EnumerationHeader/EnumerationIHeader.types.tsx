import { EnumerationMode } from '../Enumeration.types';

export interface EnumerationHeaderProps {
	filteredItems: string[];
	id: string;
	items: string[];
	mode: EnumerationMode;
	setFilteredItems: (filteredItems: string[]) => void;
	setMode: (mode: EnumerationMode) => void;
	onChange: any;
	onCreate?: (value: string) => Promise<unknown>;
	onImport?: (...params: unknown[]) => void;
	onRemove?: (entries: string[]) => Promise<unknown>;
	selectedItems: string[];
	setSelectedItems: (selectedItems: string[]) => void;
	title: string;
}
