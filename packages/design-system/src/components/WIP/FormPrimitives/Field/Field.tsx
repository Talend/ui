import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';
import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import Label, { LabelProps } from '../Label/Label';
import { InlineMessageDestructive, InlineMessageInformation } from '../../../InlineMessage';
import VisuallyHidden from '../../../VisuallyHidden';
import { unstable_useId as useId } from 'reakit';

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
	label: LabelProps | string;
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
			name,
			hasError = false,
			hideLabel = false,
			required = false,
			description,
			...rest
		} = props;

		const { id: reakitId } = useId();
		const fieldID = id || `field--${reakitId}`;

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
			<StackVertical gap="XXS" align="stretch" justify="start">
				{LabelComponent}
				{cloneElement(children, { id: fieldID, hasError, name, required, ...rest }, ref)}
				{link && <Link {...link} />}
				{description && <Description />}
			</StackVertical>
		);
	},
);

Field.displayName = 'Field';

export default Field;
