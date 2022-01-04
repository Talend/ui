import React from 'react';
import { unstable_useId as useId } from 'reakit';
import { isElement } from 'react-is';
import classnames from 'classnames';

import { FieldProps } from '../Field/Field';
import InlineMessage from '../../InlineMessage';

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

		const Description = () => {
			const descriptionProps = {
				small: true,
				description,
			};
			if (hasError) {
				return <InlineMessage.Destructive {...descriptionProps} />;
			}
			if (hasWarning) {
				return <InlineMessage.Warning {...descriptionProps} />;
			}
			if (hasSuccess) {
				return <InlineMessage.Success {...descriptionProps} />;
			}
			if (hasInformation) {
				return <InlineMessage.Information {...descriptionProps} />;
			}
			return <InlineMessage {...descriptionProps} />;
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
								<S.SpanPrefix>{prefix}</S.SpanPrefix>
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
								<S.SpanSuffix>{suffix}</S.SpanSuffix>
							) : (
								React.cloneElement(suffix, childrenProps)
							)}
						</div>
					)}
				</S.FieldGroupRow>
				{description && (
					<div id={descriptionId}>
						<div className="c-input--group__description">
							<Description />
						</div>
					</div>
				)}
			</S.FieldGroup>
		);
	},
);

export default FieldGroup;
