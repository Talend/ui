import { forwardRef, ReactElement, Ref } from 'react';
import { isElement } from 'react-is';
import classnames from 'classnames';
import AffixButton, { AffixButtonPropsType } from '../../../Form/Affix/variations/AffixButton';
import AffixReadOnly, {
	AffixReadOnlyPropsType,
} from '../../../Form/Affix/variations/AffixReadOnly';
import AffixSelect from '../../../Form/Affix/variations/AffixSelect';
import { FieldPropsPrimitive, FieldStatusProps } from '../Field/Field';
import { SelectPrimitiveProps } from '../Select/Select';

import styles from './InputWrapper.module.scss';

type AffixProps =
	| ({ type: 'button' } & AffixButtonPropsType)
	| ({ type: 'text' } & AffixReadOnlyPropsType)
	| ({ type: 'select' } & Omit<FieldPropsPrimitive, 'hasError' | 'description'> &
			Omit<SelectPrimitiveProps, 'prefix' | 'suffix' | 'isAffix' | 'className' | 'style'>)
	| ReactElement
	| string;

export type AffixesProps = {
	prefix?: AffixProps & { isSuffix?: never };
	suffix?: AffixProps & { isSuffix?: never };
};

type InputWrapperProps = {
	children: ReactElement;
	disabled?: boolean;
	readOnly?: boolean;
	hasFreeHeight?: boolean;
	noStyles?: boolean;
} & AffixesProps &
	Omit<FieldStatusProps, 'errorMessage'>;

function buildAffix(affixProps: AffixProps, isReadOnly: boolean, isSuffix: boolean) {
	if (isElement(affixProps)) {
		return affixProps;
	}

	if (typeof affixProps === 'string') {
		return <AffixReadOnly isSuffix={isSuffix}>{affixProps}</AffixReadOnly>;
	}

	if (affixProps.type === 'text') {
		const { type, children, ...rest } = affixProps;
		return (
			<AffixReadOnly {...rest} isSuffix={isSuffix}>
				{children}
			</AffixReadOnly>
		);
	}

	if (affixProps.type === 'button') {
		const { type, children, ...rest } = affixProps;
		return (
			<AffixButton {...rest} isSuffix={isSuffix}>
				{children}
			</AffixButton>
		);
	}

	if (affixProps.type === 'select' && isReadOnly) {
		const { type, children, value, defaultValue, required, ...rest } = affixProps;
		return (
			<>
				<input type="hidden" value={value || defaultValue} {...rest} />
				<AffixReadOnly isSuffix={isSuffix} {...rest}>
					{value?.toString() || defaultValue?.toString() || ''}
				</AffixReadOnly>
			</>
		);
	}

	if (affixProps.type === 'select') {
		const { type, children, ...rest } = affixProps;

		return (
			<AffixSelect {...rest} isSuffix={isSuffix}>
				{children}
			</AffixSelect>
		);
	}

	return <></>;
}

const InputWrapper = forwardRef((props: InputWrapperProps, ref: Ref<HTMLDivElement>) => {
	const {
		children,
		prefix,
		suffix,
		disabled = false,
		readOnly = false,
		hasError = false,
		noStyles = false,
		hasFreeHeight = false,
		...rest
	} = props;
	return (
		<div
			{...rest}
			ref={ref}
			className={classnames(styles.inputShell, {
				[styles.inputShell_disabled]: disabled,
				[styles.inputShell_readOnly]: readOnly,
				[styles.inputShell_borderError]: hasError,
				[styles.inputShell_freeHeight]: hasFreeHeight,
				[styles.inputShell_noStyles]: noStyles,
			})}
		>
			{prefix && buildAffix(prefix, readOnly, false)}
			{children}
			{suffix && buildAffix(suffix, readOnly, true)}
		</div>
	);
});

InputWrapper.displayName = 'InputWrapper';

export default InputWrapper;
