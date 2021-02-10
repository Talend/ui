import * as React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import InlineMessage from '../InlineMessage';

const InlineMessageInformation = styled(InlineMessage).attrs({
	icon: 'talend-info-circle',
})(
	({ withBackground, theme }) => `
	color: ${theme.colors.informationColor[500]};
	background: ${withBackground && tint(0.95, theme.colors.informationColor[500])};
	box-shadow: ${withBackground && `0 1px 2px ${tint(0.75, theme.colors.informationColor[500])}`};
`,
);

export default React.memo(InlineMessageInformation);
