import React from 'react';
import { action } from '@storybook/addon-actions';

import * as Page from '..';

import { ButtonPrimary, ButtonSecondary } from '../../components/Button';
import Form from '../../components/Form';
import Link from '../../components/Link';
import { FloatingDrawer } from '../../components/WIP/Drawer';

export default {
	title: 'Pages/Pages',
	parameters: {
		docs: {
			iframeHeight: 500,
		},
	},
};

const LoginPageWith = (props: React.PropsWithChildren<any>) => (
	<Page.Login title="Welcome to Talend Cloud" {...props} />
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
			<Form.Email name="email" label="Email" />
			<Form.Password label="Password" name="password" />
			<Form.Buttons className="form__buttons">
				<ButtonPrimary onClick={action('Clicked login')} type="submit">
					Login
				</ButtonPrimary>
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
				<Form.Email name="email" label="Email" />
				<Form.Buttons className="form__buttons">
					<ButtonPrimary onClick={action('Clicked login')} type="submit">
						Login
					</ButtonPrimary>
				</Form.Buttons>
			</Form>
		</div>
	</LoginPageWith>
);

const ItemWithDetails = ({
	itemId,
	isActive,
	onClick,
}: {
	itemId: number;
	isActive?: boolean;
	onClick: (event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent, id: number) => void;
}) => {
	const [visible, setVisible] = React.useState(false);

	React.useEffect(() => {
		setVisible(!!isActive);
	}, [isActive]);

	return (
		<>
			<ButtonPrimary
				onClick={(event: React.MouseEvent<HTMLButtonElement> | KeyboardEvent) =>
					onClick(event, itemId)
				}
			>
				Item {itemId + 1}
			</ButtonPrimary>
			<FloatingDrawer
				header={<h3>Item {itemId + 1}</h3>}
				footer={<ButtonSecondary onClick={() => setVisible(false)}>Close</ButtonSecondary>}
				visible={visible}
			>
				Item {itemId + 1} details
			</FloatingDrawer>
		</>
	);
};

export const Home = () => {
	const [selected, setSelected] = React.useState<number>();

	return (
		<Page.Home>
			<table>
				{Array(10)
					.fill('')
					.map((_, rowIndex) => (
						<tr key={rowIndex}>
							{Array(10)
								.fill('')
								.map((__, cellIndex) =>
									cellIndex === 0 ? (
										<td key={`title-${rowIndex}`}>
											<ItemWithDetails
												itemId={rowIndex}
												isActive={selected === rowIndex}
												onClick={(___, id) => setSelected(id)}
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
