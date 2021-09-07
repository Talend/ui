import React from 'react';
import styled from 'styled-components';
import { Area } from '../../docs';

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
	header: <Area>Header</Area>,
	nav: <Area style={{ width: '20rem' }}>Nav</Area>,
	title: <Area>Title</Area>,
	footer: <Area>Footer</Area>,
};

export const Card = props => (
	<Template.Card {...props}>
		<Area>Main</Area>
	</Template.Card>
);
Card.args = args;

export const List = props => (
	<Template.List {...props}>
		<Area>Main</Area>
	</Template.List>
);
List.args = args;

export const Full = props => (
	<Template.Full {...props}>
		<Area>Main</Area>
	</Template.Full>
);
Full.args = args;

export const Step = props => (
	<Template.Step {...props}>
		<Area>Main</Area>
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
