import InlineEditingText from './variations/InlineEditing.text';
import InlineEditingTextarea from './variations/InlineEditing.textarea';

const InlineEditingComponent = InlineEditingText as typeof InlineEditingText & {
	Text: typeof InlineEditingText;
	Textarea: typeof InlineEditingTextarea;
};

InlineEditingComponent.Text = InlineEditingText;
InlineEditingComponent.Textarea = InlineEditingTextarea;


export default InlineEditingComponent;
