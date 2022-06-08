import React from 'react';
import { unstable_useId as useId } from 'reakit';
import { isElement } from 'react-is';
import classnames from 'classnames';

import { FieldProps } from '../Field/Field';
import {
	InlineMessageInformation,
	InlineMessageSuccess,
	InlineMessageWarning,
	InlineMessageDestructive,
} from '../../InlineMessage';
import { AffixReadOnly } from './Affix';

import * as S from './FieldGroup.style';

export type FieldGroupProps = Omit<FieldProps, 'prefix'> & {
	label: string;
	readOnly?: boolean;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
};

const FieldGroup = React.forwardRef(
	(
		{
			label,
			prefix,
			suffix,
			required,
			disabled,
			readOnly,
			hasError,
			hasWarning,
			hasSuccess,
			hasInformation,
			description,
			children,
		}: FieldGroupProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const fieldRef = React.useRef<HTMLInputElement>();
		const { id: reakitId } = useId();
		const labelId = `field-group--${reakitId}`;
		const descriptionId = `field-group__description--${reakitId}`;

		const focusField = () => fieldRef.current?.focus();

		const Description = ({ desc }: { desc: string }) => {
			const descriptionProps = {
				small: true,
				description: desc,
			};
			if (!description) {
				return null;
			}
			if (hasError) {
				return <InlineMessageDestructive {...descriptionProps} />;
			}
			if (hasWarning) {
				return <InlineMessageWarning {...descriptionProps} />;
			}
			if (hasSuccess) {
				return <InlineMessageSuccess {...descriptionProps} />;
			}
			if (hasInformation) {
				return <InlineMessageInformation {...descriptionProps} />;
			}
			return <InlineMessageInformation {...descriptionProps} />;
		};

		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		return (
			<S.FieldGroup
				className={classnames('c-field-group', {
					'c-field-group--has-prefix': prefix,
					'c-field-group--has-suffix': suffix,
					'c-field-group--required': required,
					'c-field-group--has-information': hasInformation,
					'c-field-group--has-success': hasSuccess,
					'c-field-group--has-warning': hasWarning,
					'c-field-group--has-error': hasError,
					'c-field-group--disabled': disabled,
					'c-field-group--read-only': readOnly,
				})}
			>
				<S.FieldGroupLabel id={labelId} onClick={focusField}>
					{label}
					{required && '*'}
				</S.FieldGroupLabel>
				<S.FieldGroupRow
					aria-labelledby={labelId}
					aria-describedby={description && descriptionId}
					ref={ref}
				>
					{prefix && (
						<div className="c-field-group__item c-field-group__item--prefix">
							{!isElement(prefix) ? (
								<AffixReadOnly>{prefix.toString()}</AffixReadOnly>
							) : (
								React.cloneElement(prefix, childrenProps)
							)}
						</div>
					)}
					<div className="c-field-group__item c-field-group__item--input">
						{React.Children.map(
							children,
							child =>
								isElement(child) &&
								React.cloneElement(child, {
									...childrenProps,
									ref: (node: HTMLInputElement) => {
										fieldRef.current = node;
										const { ref: childRef } = child as React.PropsWithRef<any>;
										if (typeof childRef === 'function') {
											childRef(node);
										} else if (childRef) {
											childRef.current = node;
										}
									},
								}),
						)}
					</div>
					{suffix && (
						<div className="c-field-group__item c-field-group__item--suffix">
							{!isElement(suffix) ? (
								<AffixReadOnly>{suffix.toString()}</AffixReadOnly>
							) : (
								React.cloneElement(suffix, childrenProps)
							)}
						</div>
					)}
				</S.FieldGroupRow>
				{description && (
					<div id={descriptionId}>
						<div className="c-input--group__description">
							<Description desc={description} />
						</div>
					</div>
				)}
			</S.FieldGroup>
		);
	},
);

export default FieldGroup;
