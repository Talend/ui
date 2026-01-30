import { withTranslation } from 'react-i18next';
import YearPicker from './YearPicker.component';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

/** @type Function */
const YearPickerWithTranslation = withTranslation(I18N_DOMAIN_COMPONENTS)(YearPicker);
export default YearPickerWithTranslation;
