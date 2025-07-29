import { EnumerationMode } from '../Enumeration.types';

export interface EnumerationHeaderProps {
	filteredItems: string[];
	id: string;
	items: string[];
	mode: EnumerationMode;
	onCreate: (value: string) => Promise<unknown>;
	onImport?: (data: string) => void;
	onRemove: (entries: string[]) => Promise<unknown>;
	selectedItems: string[];
	setFilteredItems: (filteredItems: string[]) => void;
	setMode: (mode: EnumerationMode) => void;
	setSelectedItems: (selectedItems: string[]) => void;
	title: string;
}
