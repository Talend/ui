import { withTranslation } from 'react-i18next';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import CalendarPicker from './CalendarPicker.component';

/** @type Function */
const CalendarPickerWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(CalendarPicker);
export default CalendarPickerWithTranslation;
