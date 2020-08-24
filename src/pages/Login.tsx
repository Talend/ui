import React from 'react';

import Template from '../templates';

import Footer from './blocks/Footer';
import SignupCTA from './blocks/SignupCTA';


import tokens from '../tokens';

const Login = ({ title, children }) => (
	<Template.Card
		title={title}
		main={
			<>
				{children}
				<SignupCTA />
			</>
		}
		footer={<Footer />}
	/>
);

export default Login;
