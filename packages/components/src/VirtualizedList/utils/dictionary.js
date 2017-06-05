import RowLarge, { rowType as rowLargeType } from '../RowLarge';

import CellActionsRenderer, { cellType as cellActionsType } from '../CellActions';
import CellCheckboxRenderer, { cellType as cellCheckboxType } from '../CellCheckbox';
import CellTitleRenderer, { cellType as cellTitleType } from '../CellTitle';

/** Cell renderers dictionary */
export const cellDictionary = {
	[cellActionsType]: CellActionsRenderer,
	[cellCheckboxType]: CellCheckboxRenderer,
	[cellTitleType]: CellTitleRenderer,
};

/** Row renderers dictionary */
export const rowDictionary = {
	[rowLargeType]: RowLarge,
};
