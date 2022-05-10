import React, { cloneElement, forwardRef, ReactElement, Ref } from 'react';
import { isElement } from 'react-is';
import { AffixButtonPropsType } from '../../FieldGroup/Affix/variations/AffixButton';
import { AffixReadOnlyPropsType } from '../../FieldGroup/Affix/variations/AffixReadOnly';
import { AffixButton, AffixReadOnly } from '../../FieldGroup/Affix';

import styles from './InputWrapper.module.scss';

type AffixProps =
	| ({ type: 'button' } & AffixButtonPropsType)
	| ({ type: 'string' } & AffixReadOnlyPropsType)
	| ReactElement;

type InputWrapperProps = {
	children: ReactElement;
	prefix?: AffixProps;
	suffix?: AffixProps;
};

function buildAffix(affixProps: AffixProps) {
	if (isElement(affixProps)) {
		return affixProps;
	}

	if (affixProps.type === 'button') {
		const { type, children, ...rest } = affixProps;
		return <AffixButton {...rest}>{children}</AffixButton>;
	}

	if (affixProps.type === 'string') {
		const { type, children, ...rest } = affixProps;
		return <AffixReadOnly {...rest}>{children}</AffixReadOnly>;
	}

	return <></>;
}

const InputWrapper = forwardRef((props: InputWrapperProps, ref: Ref<HTMLDivElement>) => {
	const { children, prefix, suffix } = props;
	return (
		<div ref={ref} className={styles.inputShell}>
			{prefix && buildAffix(prefix)}
			{children}
			{suffix && buildAffix(suffix)}
		</div>
	);
});

InputWrapper.displayName = 'InputWrapper';

export default InputWrapper;
