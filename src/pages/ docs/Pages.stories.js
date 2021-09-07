import React from 'react';

import Page from '..';

import Button from '../../components/Button';
import Form from '../../components/Form';
import Link from '../../components/Link';
import Drawer from '../../components/Drawer';

export default {
	title: 'Pages/Pages',
	parameters: {
		docs: {
			iframeHeight: 500,
		},
	},
};

const LoginPageWith = ({ children }) => (
	<Page.Login title="Welcome to Talend Cloud">{children}</Page.Login>
);

export const Disclaimer = () => (
	<LoginPageWith>
		<div className="cookie-disclaimer">
			<div className="cookie-disclaimer__text">
				<p>
					Our website uses cookies designed to enhance your experience through additional analytics
					and functionality.
				</p>
				<p>
					By clicking "Continue" you agree the use of our cookies in accordance with our{' '}
					<Link href="#cookie-policy">Cookie Policy</Link>.
				</p>
				<p>If you would like to proceed with log in please click "Continue".</p>
			</div>
		</div>
	</LoginPageWith>
);

export const Login = () => (
	<LoginPageWith>
		<Form className="login-form">
			<Form.Select label="Region">
				<optgroup label="Amazon Web Services (AWS)">
					<option>Asia Pacific AWS</option>
					<option>Europe AWS</option>
					<option>East America AWS</option>
				</optgroup>
				<optgroup label="Microsoft Azure">
					<option>West America Azure</option>
				</optgroup>
			</Form.Select>
			<Form.Email label="Email" />
			<Form.Password label="Password" />
			<Form.Buttons className="form__buttons">
				<Button.Primary type="submit">Login</Button.Primary>
			</Form.Buttons>
		</Form>
	</LoginPageWith>
);

export const PasswordRecovery = () => (
	<LoginPageWith>
		<div>
			<h2>Log in help</h2>
			<p>Please enter email used for your user account(s).</p>
			<Form>
				<Form.Email label="Email" />
				<Form.Buttons className="form__buttons">
					<Button.Primary type="submit">Submit</Button.Primary>
				</Form.Buttons>
			</Form>
		</div>
	</LoginPageWith>
);

const ItemWithDetails = ({ itemId, isActive, onClick }) => {
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		setVisible(isActive);
	}, [isActive]);

	return (
		<>
			<Drawer
				disclosure={<Button onClick={() => onClick(itemId)}>Item {itemId + 1}</Button>}
				heading={<h3>Item {itemId + 1}</h3>}
				footer={<Button.Secondary onClick={() => setVisible(false)}>Close</Button.Secondary>}
				visible={visible}
			>
				Item {itemId + 1} details
			</Drawer>
		</>
	);
};

export const Home = () => {
	const [selected, setSelected] = React.useState();

	return (
		<Page.Home>
			<table>
				{Array(10)
					.fill()
					.map((_, rowIndex) => (
						<tr key={rowIndex}>
							{Array(10)
								.fill()
								.map((_, cellIndex) =>
									cellIndex === 0 ? (
										<td key={`title-${rowIndex}`}>
											<ItemWithDetails
												itemId={rowIndex}
												isActive={selected === rowIndex}
												onClick={setSelected}
											/>
										</td>
									) : (
										<td key={`cell-${rowIndex}-${cellIndex}`}>Cell {cellIndex + 1}</td>
									),
								)}
						</tr>
					))}
			</table>
		</Page.Home>
	);
};
