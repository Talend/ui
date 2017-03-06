import ConfirmDialog from './ConfirmDialog.connect';
import {
	showConfirmDialog,
	hideConfirmDialog,
} from './showHideConfirmDialog';

ConfirmDialog.showDialog = showConfirmDialog;
ConfirmDialog.hideDialog = hideConfirmDialog;

export default ConfirmDialog;
