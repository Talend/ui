import React, { CSSProperties } from 'react';
import { TextMode as FieldTemplate } from '../../FieldTemplate';

interface TextModeCodeProps {
	id?: string;
	options?: CSSProperties;
	schema: {
		title: string;
	};
	value?: string | number;
}

export default function TextModeCode({ id, schema: { title }, value, options }: TextModeCodeProps) {
	return (
		<FieldTemplate id={id} label={title}>
			<pre style={options}>{value}</pre>
		</FieldTemplate>
	);
}
