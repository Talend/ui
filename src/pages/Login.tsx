import React from 'react';

import Template from '../templates';

import Footer from './blocks/Footer';
import SignupCTA from './blocks/SignupCTA';

const Login = ({ title, children }) => (
	<Template.Card title={title} footer={<Footer />}>
		<>
			{children}
			<SignupCTA />
		</>
	</Template.Card>
);

export default Login;
