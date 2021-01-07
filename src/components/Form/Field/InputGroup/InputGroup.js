import React from 'react';
import InputGroupPrefix from './InputGroupPrefix';
import InputGroupSuffix from './InputGroupSuffix';

import * as S from './InputGroup.style';

function isString(node) {
	return typeof node === 'string';
}

const InputGroup = ({ label, prefix, suffix, children }) => {
	const labelId = Math.round(Math.random() * 1e5);
	return (
		<S.InputGroup
			className={`input-group ${prefix ? 'input-group--has-prefix' : ''} ${
				suffix ? 'input-group--has-suffix' : ''
			}`}
			aria-labelledby={labelId}
		>
			<S.InputGroupLabel id={labelId}>{label}</S.InputGroupLabel>
			<S.InputGroupRow>
				{prefix && (
					<div className="input-group__item input-group__item--prefix">
						{isString(prefix) ? <InputGroupPrefix>{prefix}</InputGroupPrefix> : prefix}
					</div>
				)}
				<div className="input-group__item input-group__item--input">{children}</div>
				{suffix && (
					<div className="input-group__item input-group__item--suffix">
						{isString(suffix) ? <InputGroupSuffix>{suffix}</InputGroupSuffix> : suffix}
					</div>
				)}
			</S.InputGroupRow>
		</S.InputGroup>
	);
};

export default InputGroup;
