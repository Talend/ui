import { withTranslation } from 'react-i18next';
import MonthPicker from './MonthPicker.component';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

/** @type Function */
const MonthPickerWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(MonthPicker);
export default MonthPickerWithTranslation;
