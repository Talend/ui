import React, { forwardRef, ReactElement, Ref, cloneElement } from 'react';
import Link, { LinkProps } from '../../../Link/Link';
import { StackVertical } from '../../../Stack';
import Label, { LabelProps } from '../Label/Label';
import { VisuallyHidden } from '../../../../index';

type FieldProps = {
	link?: LinkProps;
	hasError?: boolean;
	hasWarning?: boolean;
	hasSuccess?: boolean;
	hasInformation?: boolean;
	description?: string;
	hideLabel?: boolean;
	label: LabelProps;
	id: string;
};

type FieldPropsWithChildren = FieldProps & { children: ReactElement };

const Field = forwardRef(
	(props: FieldPropsWithChildren, ref: Ref<HTMLInputElement | HTMLTextAreaElement>) => {
		const {
			children,
			link,
			id,
			label,
			hideLabel = false,
			hasError = false,
			hasWarning = false,
			hasInformation = false,
			hasSuccess = false,
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

		return (
			<StackVertical gap="XS" align={'stretch'} justify={'start'}>
				{LabelComponent}
				{cloneElement(children, { id, hasError, rest }, ref)}
				{link && <Link {...link} />}
			</StackVertical>
		);
	},
);

Field.displayName = 'Field';

export default Field;
