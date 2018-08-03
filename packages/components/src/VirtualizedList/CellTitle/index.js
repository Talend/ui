import '../../polyfills/focus-within';
import CellTitle from './CellTitle.component';

export const cellType = 'title';
export default {
	cellType,
	cellRenderer: CellTitle,
	className: 'tc-list-title-cell',
};
