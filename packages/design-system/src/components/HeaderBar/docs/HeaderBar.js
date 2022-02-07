import React from 'react';

import { VisuallyHidden } from 'reakit';

import Clickable from '../../Clickable';
import { ButtonPrimary, ButtonSecondary } from '../../Button';
import Dropdown from '../../Dropdown';
import Link from '../../Link';
import { Icon } from '../../Icon';
import HeaderBar from '..';

export const PortalOnBoarding = () => (
	<HeaderBar>
		<HeaderBar.Logo full>
			<Link href="#">
				<Icon name="talend-logo" />
				<VisuallyHidden>Talend</VisuallyHidden>
			</Link>
		</HeaderBar.Logo>
	</HeaderBar>
);

export const Portal = () => {
	return (
		<HeaderBar>
			<HeaderBar.Logo full>
				<Link href="#">
					<Icon name="talend-logo" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
			</HeaderBar.Logo>
			<HeaderBar.Brand>
				<Dropdown
					aria-label="Apps switcher"
					items={[
						<Link iconBefore="talend-stop" href="#">
							App name 1
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 2
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 3
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 4
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 5
						</Link>,
					]}
				>
					Select an app
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentRight>
					<HeaderBar.Item freeze>
						<ButtonPrimary onClick={() => {}} size="S">
							Subscribe now
						</ButtonPrimary>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Dropdown
							icon="talend-user-circle"
							items={[
								<Clickable>About</Clickable>,
								<></>,
								<Link href="#">Support</Link>,
								<Link href="#">Community</Link>,
								<></>,
								<Link href="#">Preferences</Link>,
								<Link href="#">Logout</Link>,
							]}
						>
							John Doe
						</Dropdown>
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
};

export const Apps = () => {
	return (
		<HeaderBar>
			<HeaderBar.Logo>
				<Link href="#">
					<Icon name="talend-logo-square" />
					<VisuallyHidden>Talend</VisuallyHidden>
				</Link>
			</HeaderBar.Logo>
			<HeaderBar.Brand>
				<Dropdown
					icon="talend-api-designer-positive"
					aria-label="Apps switcher"
					items={[
						<Link iconBefore="talend-stop" href="#">
							App name 2
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 3
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 4
						</Link>,
						<Link iconBefore="talend-stop" href="#">
							App name 5
						</Link>,
					]}
				>
					App name
				</Dropdown>
			</HeaderBar.Brand>
			<HeaderBar.Content>
				<HeaderBar.ContentLeft>
					<HeaderBar.Item>
						<Dropdown
							items={[
								<ButtonSecondary onClick={() => {}}>Open</ButtonSecondary>,
								<></>,
								<Clickable>New API</Clickable>,
								<Clickable>Make a copy</Clickable>,
								<></>,
								<Dropdown
									items={[
										<strong>OpenAPI Specification / Swagger</strong>,
										<Clickable>OAS 3.0</Clickable>,
										<Clickable>OAS / Swagger 2.0</Clickable>,
										<Clickable>Swagger 1.2</Clickable>,
										<></>,
										<strong>RAML</strong>,
										<Clickable>RAML 1.0</Clickable>,
										<Clickable>RAML 0.8</Clickable>,
									]}
								>
									Import
								</Dropdown>,
								<Clickable>Settings</Clickable>,
								<Clickable>Erase all API content</Clickable>,
							]}
						>
							API
						</Dropdown>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Clickable>Export</Clickable>
					</HeaderBar.Item>
					<HeaderBar.Item>
						<Clickable>Documentation (preview)</Clickable>
					</HeaderBar.Item>
					<HeaderBar.Item freeze>
						<span className="text">API Saved</span>
					</HeaderBar.Item>
				</HeaderBar.ContentLeft>
				<HeaderBar.ContentRight>
					<HeaderBar.Item>
						<Dropdown
							icon="talend-user-circle"
							items={[
								<Clickable>About</Clickable>,
								<></>,
								<Link href="#">Support</Link>,
								<Link href="#">Community</Link>,
								<></>,
								<Link href="#">Preferences</Link>,
								<Link href="#">Logout</Link>,
							]}
						>
							John Doe
						</Dropdown>
					</HeaderBar.Item>
				</HeaderBar.ContentRight>
			</HeaderBar.Content>
		</HeaderBar>
	);
};
