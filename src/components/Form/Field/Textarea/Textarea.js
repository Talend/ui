import React from 'react';
import Field from '../Field';

import * as S from './Textarea.style';

function Textarea({ children, ...rest }) {
	return (
		<Field as={S.Textarea} {...rest}>
			{children}
		</Field>
	);
}

export default Textarea;
