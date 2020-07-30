import React from 'react';
import styled from 'styled-components';
import Tag from '../Tag';

const StyledTag = styled(Tag)(
	({ theme }) => `
        color: ${theme.colors.tagInformationColor};
        background: ${theme.colors.tagInformationBackgroundColor};
`,
);

export default React.memo(StyledTag);
