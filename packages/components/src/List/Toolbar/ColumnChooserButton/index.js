import ColumnChooserButton from './ColumnChooserButton.component';
import ColumnChooser from './ColumnChooser';
import { mergeWithColumnChooserCollection } from './service';
import { useColumnChooserManager } from './hooks';

export default ColumnChooserButton;

const columnChooserService = {
	mergeWithColumnChooserCollection,
};

const columnChooserHooks = {
	useColumnChooserManager,
};

export { columnChooserService, columnChooserHooks, ColumnChooser };
