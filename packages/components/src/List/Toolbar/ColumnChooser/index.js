import ColumnChooserButton from './ColumnChooserButton.component';
import { mergedColumnsChooser } from './service';
import { useColumnChooserClient, useColumnChooserManager } from './hooks';

export default ColumnChooserButton;

const columnChooserService = {
	utils: { mergedColumnsChooser },
};

const columnChooserHooks = {
	useColumnChooserClient,
	useColumnChooserManager,
};

export { columnChooserService, columnChooserHooks };
