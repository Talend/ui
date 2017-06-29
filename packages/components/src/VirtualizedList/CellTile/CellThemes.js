import theme from './CellTile.scss';
import cellActionsTheme from '../CellActions/RowLargeCellActions.scss';

const CELL_CLASS_NAME = 'tc-list-tile-row';

export default [
	CELL_CLASS_NAME,
	theme[CELL_CLASS_NAME],
	cellActionsTheme.row,
];
