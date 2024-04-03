import { forwardRef, ReactElement, Ref } from 'react';

import { InlineMessageDestructive, InlineMessageInformation } from '../../../InlineMessage';
import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import { VisuallyHidden } from '../../../VisuallyHidden';
import Label, { LabelPrimitiveProps } from '../Label/Label';

export type FieldStatusProps =
	| {
			hasError: true;
			description: string;
	  }
	| {
			hasError?: boolean;
			description?: string;
	  };

export type FieldPropsPrimitive = {
	link?: LinkProps;
	hideLabel?: boolean;
	label: LabelPrimitiveProps | string;
	id?: string;
	name: string;
	required?: boolean;
} & FieldStatusProps;

type FieldPropsPrimitiveWithChildren = FieldPropsPrimitive & {
	children: ReactElement;
	fieldId: string;
};

const Field = forwardRef(
	(props: FieldPropsPrimitiveWithChildren, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			children,
			link,
			label,
			hasError = false,
			hideLabel = false,
			required = false,
			description,
			fieldId,
		} = props;

		const labelProps = typeof label === 'string' ? { children: label } : { ...label };

		const LabelComponent = hideLabel ? (
			<VisuallyHidden>
				<Label {...labelProps} htmlFor={fieldId} required={required} />
			</VisuallyHidden>
		) : (
			<Label {...labelProps} htmlFor={fieldId} required={required} />
		);

		const Description = () => {
			const inlineMessageProps = {
				'data-test': children?.props['data-test'] && children?.props['data-test'] + '-description',
				'data-testid':
					children?.props['data-testid'] && children?.props['data-testid'] + '-description',
			};

			if (description) {
				if (hasError) {
					return <InlineMessageDestructive description={description} {...inlineMessageProps} />;
				}

				return <InlineMessageInformation description={description} {...inlineMessageProps} />;
			}
			return null;
		};

		return (
			<StackVertical gap="XXS" align="stretch" justify="start" height="100%" noShrink>
				{LabelComponent}
				{children}
				{link && <Link {...link} />}
				{description && <Description />}
			</StackVertical>
		);
	},
);

Field.displayName = 'Field';

export default Field;
