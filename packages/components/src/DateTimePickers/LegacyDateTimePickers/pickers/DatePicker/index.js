import { withTranslation } from 'react-i18next';
import DatePicker from './DatePicker.component';
import I18N_DOMAIN_COMPONENTS from '../../../../constants';

/** @type Function */
const DatePickerWithTranslationLegacy = withTranslation(I18N_DOMAIN_COMPONENTS)(DatePicker);
export default DatePickerWithTranslationLegacy;
