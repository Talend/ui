import { EnumerationMode } from '../Enumeration.types';

export interface EnumerationItemProps {
	mode: EnumerationMode;
	onChange: (items: string) => void;
	onRemove?: (entries: string[]) => Promise<unknown>;
	selectedItems: string[];
	setSelectedItems: (selectedItems: string[]) => void;
	value: string;
}
