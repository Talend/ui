import React, { forwardRef, HTMLAttributes, Ref } from 'react';
import classNames from 'classnames';

import { ButtonIcon } from '../../ButtonIcon';
import { StackHorizontal } from '../../Stack';

import style from './BadgePrimitive.module.scss';
import Divider from '../../Divider';
import Dropdown from '../../Dropdown';
import { ButtonTertiary } from '../../Button';

type SanitizedBadgeProps = Omit<HTMLAttributes<HTMLDivElement>, 'style'>;

export type BadgeProps = Omit<SanitizedBadgeProps, 'onChange'> & {
	label: string;
	values?: string[];
	defaultValue?: string;
	onChange?: (
		event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent,
		value: { label: string },
	) => void;
	onRemove?: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
};

export const Label = ({ children, ...rest }: HTMLAttributes<HTMLSpanElement>) => (
	<StackHorizontal as="span" gap="XXS" {...rest}>
		<span className={style.badge__label} data-test="badge.label">
			{children}
		</span>
	</StackHorizontal>
);

const DropdownValue = ({
	defaultValue,
	values,
	onChange,
	...rest
}: Pick<BadgeProps, 'onChange' | 'values' | 'defaultValue'>) => (
	<span className={style.badge__value}>
		<StackHorizontal as="span" gap="XXS" align="center">
			<Divider orientation="vertical" />
			<Dropdown
				{...rest}
				as={ButtonTertiary}
				size="S"
				onChange={onChange}
				data-test="badge.dropdown"
				items={values?.map((value: string) => ({
					label: value,
					onClick: (e: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => {
						if (onChange) {
							onChange(e, { label: value });
						}
					},
				}))}
			>
				{defaultValue}
			</Dropdown>
		</StackHorizontal>
	</span>
);

export const RemoveButton = ({
	onClick,
}: {
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) => void;
}) => (
	<ButtonIcon icon="talend-cross" size="XS" onClick={onClick} data-test="badge.remove">
		Remove
	</ButtonIcon>
);

const BadgePrimitive = forwardRef(
	(
		{ className, label, defaultValue, values, onChange, onRemove }: BadgeProps,
		ref: Ref<HTMLSpanElement>,
	) => {
		return (
			<span className={classNames(style.badge, className)} data-test="badge" ref={ref}>
				<StackHorizontal as="span" gap="XS" align="center">
					<Label>{label}</Label>
					{onChange && (
						<DropdownValue onChange={onChange} defaultValue={defaultValue} values={values} />
					)}
					{onRemove && <RemoveButton onClick={onRemove} />}
				</StackHorizontal>
			</span>
		);
	},
);

export default BadgePrimitive;
