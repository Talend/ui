import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag)(
	({ theme }) => `
        color: ${theme.colors.tagSuccessColor};
        background: ${theme.colors.tagSuccessBackgroundColor};
`,
);

export default React.memo(StyledTag);
