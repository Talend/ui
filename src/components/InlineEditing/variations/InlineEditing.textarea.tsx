import React from 'react';
import styled from 'styled-components';
import InlineEditing, { InlineEditingProps, Mode } from '../InlineEditing';


const InlineEditingMulti: React.FC<InlineEditingProps> = styled(InlineEditing).attrs({
	className: 'c-inline-editing--textarea',
	renderAs: 'p',
	mode: Mode.Multi,
})`
	.c-inline-editing--editing.c-inline-editing__field .c-inline-editing__actions {
		padding-top: 1rem;
		height: 2.2rem;
	}

	.c-inline-editing--editing.c-inline-editing__field textarea {
		padding: 1rem;
		padding-right: 4rem;
	}

	.c-inline-editing--static.c-inline-editing__field .c-inline-editing__value {
		white-space: inherit;
	}
`;

InlineEditingMulti.displayName = 'InlineEditing.Textarea';

export default InlineEditingMulti;
