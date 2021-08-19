import React from 'react';
import styled from 'styled-components';

import Template from '..';
import { Stepper } from '../../index';

export default {
	title: 'Templates/Templates',
};

const Box = styled.div`
	display: flex;
	flex-basis: 100%;
	align-items: center;
	justify-content: center;
	margin: 1rem;
	padding: 0.5rem;
	min-height: 0;
	font-weight: bold;
	font-size: 2rem;
	color: coral;
	background: cornsilk;
	border: 1px dashed coral;
	border-radius: 1rem;
`;

const args = {
	header: <Box>Header</Box>,
	nav: <Box style={{ width: '20rem' }}>Nav</Box>,
	title: <Box>Title</Box>,
	footer: <Box>Footer</Box>,
};

export const Card = props => (
	<Template.Card {...props}>
		<Box>Main</Box>
	</Template.Card>
);
Card.args = args;

export const List = props => (
	<Template.List {...props}>
		<Box>Main</Box>
	</Template.List>
);
List.args = args;

export const Full = props => (
	<Template.Full {...props}>
		<Box>Main</Box>
	</Template.Full>
);
Full.args = args;

export const Step = props => (
	<Template.Step {...props}>
		<Box>Main</Box>
	</Template.Step>
);
Step.args = {
	...args,
	stepper: (
		<Stepper.Vertical>
			<Stepper.Step.Validated>Validated</Stepper.Step.Validated>
			<Stepper.Step.InProgress>InProgress</Stepper.Step.InProgress>
			<Stepper.Step.Enabled>Enabled</Stepper.Step.Enabled>
		</Stepper.Vertical>
	),
};
