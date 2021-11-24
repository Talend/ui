import i18n from 'i18next';
import styled from 'styled-components';
import Status from '../Status';

const StyledStatus = styled(Status).attrs(props => ({
	...props,
	inProgress: true,
	className: 'status--in-progress',
	children: props.children || i18n.t('IN_PROGRESS', 'In progress'),
}))`
	--t-status-color: ${({ theme }) => theme.colors?.statusInProgressColor};
`;

export default StyledStatus;
