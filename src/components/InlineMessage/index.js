import InlineMessage from './InlineMessage';
import InlineMessageInformation from './variations/InlineMessage.information';
import InlineMessageSuccess from './variations/InlineMessage.success';
import InlineMessageWarning from './variations/InlineMessage.warning';
import InlineMessageDestructive from './variations/InlineMessage.destructive';

// @see https://company-57688.frontify.com/document/276652#/new-features/inline-message

InlineMessage.Information = InlineMessageInformation;
InlineMessage.Success = InlineMessageSuccess;
InlineMessage.Warning = InlineMessageWarning;
InlineMessage.Destructive = InlineMessageDestructive;

export default InlineMessage;
