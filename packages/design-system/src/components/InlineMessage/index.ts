import InlineMessage from './InlineMessage';
import InlineMessageInformation from './variations/InlineMessage.information';
import InlineMessageSuccess from './variations/InlineMessage.success';
import InlineMessageWarning from './variations/InlineMessage.warning';
import InlineMessageDestructive from './variations/InlineMessage.destructive';

// @see https://company-57688.frontify.com/document/276652#/new-features/inline-message

const InlineMessageComponent = InlineMessage as typeof InlineMessage & {
	Information: typeof InlineMessageInformation;
	Success: typeof InlineMessageSuccess;
	Warning: typeof InlineMessageWarning;
	Destructive: typeof InlineMessageDestructive;
};

InlineMessageComponent.Information = InlineMessageInformation;
InlineMessageComponent.Success = InlineMessageSuccess;
InlineMessageComponent.Warning = InlineMessageWarning;
InlineMessageComponent.Destructive = InlineMessageDestructive;

export default InlineMessageComponent;
