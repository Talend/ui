import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { StepperProps } from '../components/Stepper/Stepper';

export type StepByStepProps = PropsWithChildren<any> & {
	header?: React.ReactElement;
	stepper?: StepperProps;
};

const Box = styled.div<{ width?: number }>``;

const Row = styled(Box)`
	display: flex;
	flex: ${({ width }) => (width ? 0 : 1)};
	flex-basis: ${({ width }) => width || 'auto'};
	background: ${({ theme }) => theme.colors.backgroundColor};
`;

const Col = styled(Box)`
	width: ${({ width }) => (width ? 'auto' : '100%')};
`;

const Step: React.FC<StepByStepProps> = ({ header, children, stepper }: StepByStepProps) => (
	<Layout hasScreenHeight header={header}>
		<Row>
			<Col width={25}>{stepper}</Col>
			<Col>{children}</Col>
		</Row>
	</Layout>
);

export default Step;
