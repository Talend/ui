import React from 'react';
import { unstable_useId as useId } from 'reakit';
import { isElement } from 'react-is';
import classnames from 'classnames';

import InlineMessage from '../../../InlineMessage';

import * as S from './InputGroup.style';

export type InputGroupProps = HTMLInputElement & {
	label: string;
	prefix?: React.ReactNode;
	suffix?: React.ReactNode;
	hasError?: boolean;
	hasWarning?: boolean;
	hasSuccess?: boolean;
	hasInformation?: boolean;
	description?: string;
};

const InputGroup = React.forwardRef(
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
		}: InputGroupProps,
		ref: React.Ref<HTMLDivElement>,
	) => {
		const fieldRef = React.useRef<HTMLInputElement>();
		const { id: reakitId } = useId();
		const labelId = `input-group--${reakitId}`;

		const childrenProps: { disabled?: boolean; readOnly?: boolean } = {};
		if (disabled) childrenProps.disabled = true;
		if (readOnly) childrenProps.readOnly = true;

		const focusField = () => fieldRef.current?.focus();

		const Description = () => {
			if (hasError) {
				return <InlineMessage.Destructive small description={description} />;
			}
			if (hasWarning) {
				return <InlineMessage.Warning small description={description} />;
			}
			if (hasSuccess) {
				return <InlineMessage.Success small description={description} />;
			}
			if (hasInformation) {
				return <InlineMessage.Information small description={description} />;
			}
			return <InlineMessage small description={description} />;
		};

		return (
			<S.InputGroup
				className={classnames('input-group', {
					'input-group--has-prefix': prefix,
					'input-group--has-suffix': suffix,
					'input-group--required': required,
					'input-group--has-information': hasInformation,
					'input-group--has-success': hasSuccess,
					'input-group--has-warning': hasWarning,
					'input-group--has-error': hasError,
					'input-group--disabled': disabled,
					'input-group--read-only': readOnly,
				})}
			>
				<S.InputGroupLabel id={labelId} onClick={focusField}>
					{label}
					{required && '*'}
				</S.InputGroupLabel>
				<S.InputGroupRow aria-labelledby={labelId} ref={ref}>
					{prefix && (
						<div className="input-group__item input-group__item--prefix">
							{!isElement(prefix) ? (
								<S.SpanPrefix>{prefix}</S.SpanPrefix>
							) : (
								React.cloneElement(prefix, childrenProps)
							)}
						</div>
					)}
					<div className="input-group__item input-group__item--input">
						{isElement(children) &&
							React.cloneElement(children, { ...childrenProps, ref: fieldRef })}
					</div>
					{suffix && (
						<div className="input-group__item input-group__item--suffix">
							{!isElement(suffix) ? (
								<S.SpanSuffix>{suffix}</S.SpanSuffix>
							) : (
								React.cloneElement(suffix, childrenProps)
							)}
						</div>
					)}
				</S.InputGroupRow>
				{description && <Description />}
			</S.InputGroup>
		);
	},
);

export default InputGroup;
