import styled from 'styled-components';

import Progress from '../Progress';

const ProgressVertical = styled(Progress).attrs({
	className: 'progress-bar--vertical',
	orientation: 'vertical',
})`
	top: 0.1rem;
	right: 0.9rem;
	bottom: 0.1rem;
	width: 0.2rem;
	background-image: url("data:image/svg+xml,%3csvg width='100%25' height='100%25' xmlns='http://www.w3.org/2000/svg'%3e%3cline x1='0' y1='0' x2='0' y2='100%25' fill='none' stroke='%23d2d2d2' stroke-width='4' stroke-dasharray='2%2c6'/%3e%3c/svg%3e");

	div {
		width: 0.2rem;
	}
`;

export default ProgressVertical;
