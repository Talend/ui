import i18n from 'i18next';
import styled from 'styled-components';
import Status from '../Status';

const StyledStatus = styled(Status).attrs(props => ({
	...props,
	icon: 'talend-block',
	className: 'status--canceled',
	children: props.children || i18n.t('CANCELED', 'Canceled'),
}))`
	--t-status-color: ${({ theme }) => theme.colors?.statusCanceledColor};
`;

export default StyledStatus;
