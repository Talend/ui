import React from 'react';

import Template from '../templates';

import Footer from './blocks/Footer';
import SignupCTA from './blocks/SignupCTA';

interface Props {
	title: string;
	children: React.ReactChild;
}

const Login = ({ title, children }: Props) => (
	<Template.Card title={title} footer={<Footer />}>
		<>
			{children}
			<SignupCTA />
		</>
	</Template.Card>
);

export default Login;
