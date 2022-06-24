import React, { forwardRef, ReactElement, Ref, cloneElement } from 'react';
import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import Label, { LabelProps } from '../Label/Label';
import { InlineMessageDestructive, InlineMessageInformation } from '../../../InlineMessage';
import VisuallyHidden from '../../../VisuallyHidden';

export type FieldStatusProps =
	| {
			hasError: true;
			description: string;
	  }
	| {
			hasError?: false;
			description?: string;
	  };

type FieldProps = {
	link?: LinkProps;
	hideLabel?: boolean;
	label: LabelProps;
	id: string;
	name: string;
} & FieldStatusProps;

type FieldPropsWithChildren = FieldProps & { children: ReactElement };

const Field = forwardRef(
	(props: FieldPropsWithChildren, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			children,
			link,
			id,
			label,
			name,
			hasError = false,
			hideLabel = false,
			description,
			...rest
		} = props;

		const LabelComponent = hideLabel ? (
			<VisuallyHidden>
				<Label {...label} htmlFor={id} />
			</VisuallyHidden>
		) : (
			<Label {...label} htmlFor={id} />
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
				{cloneElement(children, { id, hasError, name, rest }, ref)}
				{link && <Link {...link} />}
				{description && <Description />}
			</StackVertical>
		);
	},
);

Field.displayName = 'Field';

export default Field;
