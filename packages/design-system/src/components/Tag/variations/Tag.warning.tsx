import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag).attrs({
	className: 'tag--warning',
})`
	--t-tag-color: ${({ theme }) => theme.colors?.tagWarningColor};
	--t-tag-background-color: ${({ theme }) => theme.colors?.tagWarningBackgroundColor};
`;

export default React.memo(StyledTag);
