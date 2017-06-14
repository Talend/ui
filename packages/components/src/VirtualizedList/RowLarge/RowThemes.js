import theme from './RowLarge.scss';
import cellActionsTheme from '../CellActions/RowLargeCellActions.scss';

const ROW_CLASS_NAME = 'tc-list-large';

export default [
	ROW_CLASS_NAME,
	theme[ROW_CLASS_NAME],
	cellActionsTheme.row,
];
