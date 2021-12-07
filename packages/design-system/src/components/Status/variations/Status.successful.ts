import i18n from 'i18next';
import styled from 'styled-components';
import Status, { StatusProps } from '../Status';

const StyledStatus = styled(Status).attrs((props: StatusProps) => ({
	...props,
	icon: 'talend-check-circle',
	className: 'status--successful',
	children: props.children || i18n.t('SUCCESSFUL', 'Successful'),
}))`
	--t-status-color: ${({ theme }) => theme.colors?.statusSuccessColor};
`;

export default StyledStatus;
