import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';
import { isElement } from 'react-is';
import { AffixButtonPropsType } from '../../FieldGroup/Affix/variations/AffixButton';
import { AffixReadOnlyPropsType } from '../../FieldGroup/Affix/variations/AffixReadOnly';
import { AffixButton, AffixReadOnly } from '../../FieldGroup/Affix';

import styles from './InputWrapper.module.scss';
import classnames from 'classnames';

type AffixProps =
	| ({ type: 'button' } & AffixButtonPropsType)
	| ({ type: 'text' } & AffixReadOnlyPropsType)
	| ReactElement;

export type AffixesProps = {
	prefix?: AffixProps;
	suffix?: AffixProps;
};

type InputWrapperProps = {
	children: ReactElement;
	disabled?: boolean;
	readOnly?: boolean;
} & AffixesProps;

function buildAffix(affixProps: AffixProps) {
	if (isElement(affixProps)) {
		return affixProps;
	}

	if (affixProps.type === 'button') {
		const { type, children, ...rest } = affixProps;
		return <AffixButton {...rest}>{children}</AffixButton>;
	}

	if (affixProps.type === 'text') {
		const { type, children, ...rest } = affixProps;
		return <AffixReadOnly {...rest}>{children}</AffixReadOnly>;
	}

	return <></>;
}

const InputWrapper = forwardRef((props: InputWrapperProps, ref: Ref<HTMLDivElement>) => {
	const { children, prefix, suffix, disabled = false, readOnly = false } = props;
	return (
		<div
			ref={ref}
			className={classnames(styles.inputShell, {
				[styles.inputShell_disabled]: disabled,
				[styles.inputShell_readOnly]: readOnly,
			})}
		>
			{prefix && buildAffix(prefix)}
			{children}
			{suffix && buildAffix(suffix)}
		</div>
	);
});

InputWrapper.displayName = 'InputWrapper';

export default InputWrapper;
