import i18n from 'i18next';
import styled from 'styled-components';
import Status from '../Status';

const StyledStatus = styled(Status).attrs(props => ({
	...props,
	icon: 'talend-warning',
	className: 'status--warning',
	children: props.children || i18n.t('WARNING', 'Warning'),
}))`
	--t-status-color: ${({ theme }) => theme.colors?.statusWarningColor};
`;

export default StyledStatus;
