import i18n from 'i18next';
import styled from 'styled-components';
import Status from '../Status';

const StyledStatus = styled(Status).attrs(props => ({
	...props,
	icon: 'talend-error',
	className: 'status--failed',
	children: props.children || i18n.t('FAILED', 'Failed'),
}))`
	--t-status-color: ${({ theme }) => theme.colors?.statusFailedColor};
`;

export default StyledStatus;
