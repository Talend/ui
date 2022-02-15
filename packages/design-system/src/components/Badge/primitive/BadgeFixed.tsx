import React, { forwardRef, Ref } from 'react';

import BadgeBase, { BadgeProps, Label } from './BadgePrimitive';
import { ButtonTertiary } from '../../Button';
import Divider from '../../Divider';
import Dropdown from '../../Dropdown';
import { StackHorizontal } from '../../Stack';

import style from './BadgePrimitive.module.scss';

type BadgeWithDropdownProps = BadgeProps & {
	values: string[];
	defaultValue?: string;
	onChange: (
		event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
		value: { label: string },
	) => void;
};

const Value = ({
	onChange,
	values,
	defaultValue,
	...rest
}: Omit<BadgeWithDropdownProps, 'label'>) => (
	<StackHorizontal gap="XXS" align="center" data-ellipsis>
		<Divider orientation="vertical" />
		<Dropdown
			{...rest}
			as={ButtonTertiary}
			size="S"
			onChange={onChange}
			data-test="badge.dropdown"
			items={values?.map((value: string) => ({
				label: value,
				onClick: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) =>
					onChange(e, { label: value }),
			}))}
		>
			{defaultValue}
		</Dropdown>
	</StackHorizontal>
);

const Badge = forwardRef(
	(
		{ label, onChange, defaultValue, values, ...rest }: BadgeWithDropdownProps,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<BadgeBase className={style.badgeFixed} ref={ref}>
				<Label>{label}</Label>
				<Value {...rest} values={values} defaultValue={defaultValue} onChange={onChange} />
			</BadgeBase>
		);
	},
);

export default Badge;
