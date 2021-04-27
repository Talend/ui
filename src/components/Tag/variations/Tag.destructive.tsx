import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag).attrs({
	className: 'tag--destructive',
})`
	--t-tag-color: ${({ theme }) => theme.colors?.tagDestructiveColor};
	--t-tag-background-color: ${({ theme }) => theme.colors?.tagDestructiveBackgroundColor};
`;

export default React.memo(StyledTag);
