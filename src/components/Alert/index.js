import Alert from './Alert';
import AlertInformation from './variations/Alert.information';
import AlertSuccess from './variations/Alert.success';
import AlertWarning from './variations/Alert.warning';
import AlertDestructive from './variations/Alert.destructive';

// @see https://company-57688.frontify.com/document/276652#/new-features/inline-message

Alert.Information = AlertInformation;
Alert.Success = AlertSuccess;
Alert.Warning = AlertWarning;
Alert.Destructive = AlertDestructive;

export default Alert;
