import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag)(
	({ theme }) => `
        color: ${theme.colors.tagWarningColor};
        background: ${theme.colors.tagWarningBackgroundColor};
`,
);

export default React.memo(StyledTag);
