import { InlineEditingText, InlineEditingTextProps } from './variations/InlineEditing.text';
import {
	InlineEditingTextarea,
	InlineEditingTextareaProps,
} from './variations/InlineEditing.textarea';

const InlineEditing = InlineEditingText as typeof InlineEditingText & {
	Text: typeof InlineEditingText;
	Textarea: typeof InlineEditingTextarea;
};

InlineEditing.Text = InlineEditingText;
InlineEditing.Textarea = InlineEditingTextarea;

export type InlineEditingProps = InlineEditingTextProps;
export { InlineEditing };
export type { InlineEditingTextProps, InlineEditingTextareaProps };
