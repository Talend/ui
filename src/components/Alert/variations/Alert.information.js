import React from 'react';
import styled from 'styled-components';
import { tint } from 'polished';
import Alert from '../Alert';
import tokens from '../../../tokens';
import Icon from '../../Icon';

const StyledComponent = styled(Alert)`
	background: ${props => props.background && tint(0.9, tokens.colors.informationColor)};
`;

const AlertInformation = React.forwardRef((props, ref) => {
	return (
		<StyledComponent
			icon={<Icon className={'text-blue-500'} name={'information'} />}
			{...props}
			ref={ref}
		/>
	);
});

AlertInformation.propTypes = Alert.propTypes;

export default React.memo(AlertInformation);
