import RowLarge, { rowType as rowLargeType } from '../RowLarge';

import CellActionsRenderer, { cellType as cellActionsType } from '../CellActions';
import CellTitleRenderer, { cellType as cellTitleType } from '../CellTitle';

/** Cell renderers dictionary */
export const cellDictionary = {
	[cellActionsType]: CellActionsRenderer,
	[cellTitleType]: CellTitleRenderer,
};

/** Row renderers dictionary */
export const rowDictionary = {
	[rowLargeType]: RowLarge,
};
