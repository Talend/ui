import { withTranslation } from 'react-i18next';
import DatePicker from './DatePicker.component';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

/** @type Function */
const DatePickerWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(DatePicker);
export default DatePickerWithTranslation;
