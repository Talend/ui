/**
 * Instructions : add a cell renderer
 *
 * 1- Copy/paste the CellModel folder
 * 2- Rename the folder, the files names
 * 3- Open each file and execute each //TODO
 * 4- In VirtualizedList/utils/dictionary.js, register your cell renderer in the dictionary
 */

import CellModel from './CellModel.component';

/*
 TODO
 * rename your cell type
 */
export const cellType = 'model';

/*
 TODO
 * rename your cell renderer
 * you can add extra info to pass to the cell container like a classname
 */
export default {
	cellRenderer: CellModel,
};
