import React, { PropsWithChildren } from 'react';
import styled from 'styled-components';

import Layout from '../components/Layout';
import { StepperProps } from '../components/Stepper/Stepper';
import { tokens } from '../../lib';

export type StepByStepProps = PropsWithChildren<any> & {
	header?: React.ReactElement;
	stepper?: StepperProps;
};

const Box = styled.div<{ background?: string; width?: number }>`
	width: ${({ width }) => (width ? 'auto' : '100%')};
	background: ${({ background }) => background || tokens.colors.transparent};
`;

const Row = styled(Box)`
	display: flex;
	flex: ${({ width }) => (width ? 0 : 1)};
	flex-basis: ${({ width }) => width || 'auto'};
`;

const Step: React.FC<StepByStepProps> = ({ header, children, stepper }: StepByStepProps) => (
	<Layout hasScreenHeight header={header}>
		<Row background={tokens.colors.gray[0]}>
			<Box width={25}>{stepper}</Box>
			<Box>{children}</Box>
		</Row>
	</Layout>
);

export default Step;
