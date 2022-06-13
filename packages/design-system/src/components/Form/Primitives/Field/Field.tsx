import React, { forwardRef, ReactElement, Ref, cloneElement } from 'react';
import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import Label, { LabelProps } from '../Label/Label';
import { InlineMessageDestructive, InlineMessageInformation } from '../../../InlineMessage';
import VisuallyHidden from '../../../VisuallyHidden';

export type FieldStatusProps = {
	isError?: boolean;
};

type FieldProps = {
	link?: LinkProps;
	description?: string;
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
			hideLabel = false,
			isError = false,
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

		const Description = ({ descriptionText }: { descriptionText: string }) => {
			const descProps = {
				description: descriptionText,
			};
			if (isError) {
				return <InlineMessageDestructive {...descProps} />;
			}
			return <InlineMessageInformation {...descProps} />;
		};

		return (
			<StackVertical gap="XXS" align={'stretch'} justify={'start'}>
				{LabelComponent}
				{cloneElement(children, { id, isError, name, rest }, ref)}
				{link && <Link {...link} />}
				{description && <Description descriptionText={description} />}
			</StackVertical>
		);
	},
);

Field.displayName = 'Field';

export default Field;
