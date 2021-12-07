import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag).attrs({
	className: 'tag--success',
})`
	--t-tag-color: ${({ theme }) => theme.colors?.tagSuccessColor};
	--t-tag-background-color: ${({ theme }) => theme.colors?.tagSuccessBackgroundColor};
`;

export default React.memo(StyledTag);
