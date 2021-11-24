import React from 'react';
import styled from 'styled-components';
import InlineEditing, { InlineEditingProps, Mode } from '../InlineEditing';


const InlineEditingSingle: React.FC<InlineEditingProps> = styled(InlineEditing).attrs({
	className: 'c-inline-editing--text',
	renderAs: 'span',
	mode: Mode.Single,
})``;

InlineEditingSingle.displayName = 'InlineEditing.Text';

export default InlineEditingSingle;
