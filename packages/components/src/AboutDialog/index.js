import AboutDialog from './AboutDialog.component';
import { AboutDialogTable, Text, getColumnHeaders } from './AboutDialogTable.component';

AboutDialogTable.Text = Text;
AboutDialogTable.getColumnHeaders = getColumnHeaders;
AboutDialog.Table = AboutDialogTable;

export default AboutDialog;
