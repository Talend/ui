import { withTranslation } from 'react-i18next';
import TimePicker from './TimePicker.component';
import I18N_DOMAIN_COMPONENTS from '../../../../constants';

/** @type Function */
const TimePickerWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(TimePicker);
export default TimePickerWithTranslation;
