import { forwardRef, ReactElement, Ref } from 'react';

import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import Label, { LabelPrimitiveProps } from '../Label/Label';
import { InlineMessageDestructive, InlineMessageInformation } from '../../../InlineMessage';
import { VisuallyHidden } from '../../../VisuallyHidden';
import { useId } from '../../../../useId';

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

type FieldPropsPrimitiveWithChildren = FieldPropsPrimitive & { children: ReactElement };

const Field = forwardRef(
	(props: FieldPropsPrimitiveWithChildren, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			children,
			link,
			id,
			label,
			hasError = false,
			hideLabel = false,
			required = false,
			description,
		} = props;

		const fieldID = useId(id, 'field-');

		const labelProps = typeof label === 'string' ? { children: label } : { ...label };

		const LabelComponent = hideLabel ? (
			<VisuallyHidden>
				<Label {...labelProps} htmlFor={fieldID} required={required} />
			</VisuallyHidden>
		) : (
			<Label {...labelProps} htmlFor={fieldID} required={required} />
		);

		const Description = () => {
			if (description) {
				if (hasError) {
					return <InlineMessageDestructive description={description} />;
				}

				return <InlineMessageInformation description={description} />;
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
