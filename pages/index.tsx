import React from 'react';

import {
	Accordion,
	Button,
	Card,
	Combobox,
	Divider,
	Dropdown,
	Form,
	HeaderBar,
	Icon,
	IconsProvider,
	InlineMessage,
	Layout,
	Link,
	Loading,
	Menu,
	Modal,
	Popover,
	Skeleton,
	Switch,
	Tabs,
	Tag,
	ThemeProvider,
	Toggle,
	Tooltip,
	VisuallyHidden,
} from '../src';

export default function () {
	return (
		<ThemeProvider>
			<ThemeProvider.GlobalStyle />
			<IconsProvider bundles={['https://unpkg.com/@talend/icons/dist/svg-bundle/all.svg']} />
			<ThemeProvider.ThemeSwitcher />
			<h1>Catalog</h1>
			<strong>What can I do with the design system?</strong>
			<main id="components">
				<section>
					<h2>Accordion</h2>
					<Accordion>
						<Accordion.Item disclosure={<span>title</span>}>Content</Accordion.Item>
						<Accordion.Item disclosure={<span>title</span>}>Content</Accordion.Item>
					</Accordion>
				</section>
				<section>
					<h2>Buttons</h2>
					<h3>Primary</h3>
					<Button.Primary>Button primary</Button.Primary>
					<Button.Primary icon="talend-plus">Button primary</Button.Primary>
					<Button.Primary small>Button primary small</Button.Primary>
					<h3>Destructive</h3>
					<Button.Destructive>Button destructive</Button.Destructive>
					<Button.Destructive icon="talend-plus">Button destructive</Button.Destructive>
					<Button.Destructive small>Button destructive small</Button.Destructive>
					<h3>Secondary</h3>
					<Button.Secondary>Button secondary</Button.Secondary>
					<Button.Secondary icon="talend-plus">Button secondary</Button.Secondary>
					<Button.Secondary small>Button secondary small</Button.Secondary>
					<h3>Tertiary</h3>
					<Button.Tertiary>Button tertiary</Button.Tertiary>
					<Button.Tertiary icon="talend-plus">Button tertiary</Button.Tertiary>
					<Button.Tertiary small>Button tertiary small</Button.Tertiary>
				</section>
				<section>
					<h2>Card</h2>
					<Card>Lorem ipsum</Card>
				</section>
				<section>
					<h2>Combobox</h2>
					<Combobox initialValue="" values={['Item 1', 'Item 11', 'Item 111']} />
				</section>
				<section>
					<h2>Divider</h2>
					<Divider />
				</section>
				<section>
					<h2>Dropdown</h2>
					<Dropdown
						as={Button.Primary}
						aria-label="Custom menu"
						items={[
							<Button>Custom item 1</Button>,
							<Link>Custom item 2</Link>,
							<span>Custom item 3</span>,
						]}
					>
						Menu
					</Dropdown>
				</section>
				<section>
					<h2>Forms</h2>
					<Form>
						<Form.Fieldset legend="Fieldset">
							<Form.Text label="Input" />
							<Form.Text
								label="Input with error"
								errorMessage="Lorem ipsum dolor sit amet Quis nostrud exercitation ullamco laboris nisi ut aliquip ex eaLorem ipsum dolor sit ame"
							/>
							<Form.InputGroup
								label="Phone"
								prefix={
									<Form.Select label="Phone prefix" value="France (+33)" style={{ width: '13rem' }}>
										{['US (+1)', 'France (+33)'].map(countryCode => (
											<option>{countryCode}</option>
										))}
									</Form.Select>
								}
							>
								<Form.Tel label="Phone number" />
							</Form.InputGroup>
							<Form.InputGroup
								label="Column"
								suffix={
									<Form.Select label="Column type" value="Date">
										{['String', 'Long', 'Date', 'Boolean', 'Decimal'].map(columnType => (
											<option>{columnType}</option>
										))}
									</Form.Select>
								}
							>
								<Form.Text label="Column name" />
							</Form.InputGroup>
							<Form.InputGroup label="Amount" prefix="$" suffix=".00">
								<Form.Number label="Amount without decimal" min="1" step="1" />
							</Form.InputGroup>
							<Form.File label="File" />
							<Form.Password label="Password" />
							<Form.Datalist label="Datalist" values={['foo', 'bar']} />
							<Form.Search label="Search" />
							<Form.Textarea label="Textarea" />
							<Form.Range label="Range" />
							<Form.Select label="Select">
								<option selected>Foo</option>
								<option>Bar</option>
							</Form.Select>
							<Form.Select label="Select multiple" multiple>
								<option selected>Foo</option>
								<option>Bar</option>
							</Form.Select>
							<Form.Checkbox label="Checkbox" checked />
							<Form.Radio label="Radio" checked />
							<Form.Switch label="Switch" checked />
						</Form.Fieldset>
						<Form.Buttons>
							<Button.Secondary type="reset">Reset</Button.Secondary>
							<Button.Primary type="submit">Submit</Button.Primary>
						</Form.Buttons>
					</Form>
				</section>
				<section>
					<h2>HeaderBar</h2>
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
											<Button.Secondary>Open</Button.Secondary>,
											<></>,
											<Button>New API</Button>,
											<Button>Make a copy</Button>,
											<></>,
											<Dropdown
												items={[
													<strong disabled>OpenAPI Specification / Swagger</strong>,
													<Button>OAS 3.0</Button>,
													<Button>OAS / Swagger 2.0</Button>,
													<Button>Swagger 1.2</Button>,
													<></>,
													<strong disabled>RAML</strong>,
													<Button>RAML 1.0</Button>,
													<Button>RAML 0.8</Button>,
												]}
											>
												Import
											</Dropdown>,
											<Button>Settings</Button>,
											<Button>Erase all API content</Button>,
										]}
									>
										API
									</Dropdown>
								</HeaderBar.Item>
								<HeaderBar.Item>
									<Button>Export</Button>
								</HeaderBar.Item>
								<HeaderBar.Item>
									<Button>Documentation (preview)</Button>
								</HeaderBar.Item>
								<HeaderBar.Item freeze>
									<span className="text">API Saved</span>
								</HeaderBar.Item>
							</HeaderBar.ContentLeft>
							<HeaderBar.ContentRight>
								<HeaderBar.Item>
									<Tooltip
										title="Notifications (you have no unread notifications)"
										placement="bottom"
									>
										<Toggle icon="talend-bell-notification">Notifications</Toggle>
									</Tooltip>
								</HeaderBar.Item>
								<HeaderBar.Item>
									<Tooltip title="Chat with Talend support" placement="bottom">
										<Toggle icon="talend-bubbles">Intercom</Toggle>
									</Tooltip>
								</HeaderBar.Item>
								<HeaderBar.Item>
									<Link iconBefore="talend-info-circle" href="#">
										Help
									</Link>
								</HeaderBar.Item>
								<HeaderBar.Item>
									<Dropdown
										icon="talend-user-circle"
										items={[
											<Button>About</Button>,
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
				</section>
				<section>
					<h2>Icon</h2>
					<Icon name="talend-datagrid" />
				</section>
				<section>
					<h2>Inline messages</h2>
					<InlineMessage.Information
						title={'Lorem ipsum'}
						description={
							'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.'
						}
						link={<Link href={'#'}>See more</Link>}
						small
						withBackground
					/>
					<InlineMessage.Success
						title={'Lorem ipsum'}
						description={
							'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.'
						}
						link={<Link href={'#'}>See more</Link>}
						small
						withBackground
					/>
					<InlineMessage.Warning
						title={'Lorem ipsum'}
						description={
							'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.'
						}
						link={<Link href={'#'}>See more</Link>}
						small
						withBackground
					/>
					<InlineMessage.Destructive
						title={'Lorem ipsum'}
						description={
							'dolor sit amet, consectetur adipiscing elit. Integer gravida orci lacus, vel convallis enim posuere ac.'
						}
						link={<Link href={'#'}>See more</Link>}
						small
						withBackground
					/>
				</section>
				<section>
					<h2>Links</h2>
					<Link href="#">Link</Link>
				</section>
				<section>
					<h2>Layout</h2>
					<h3>Stack</h3>
					<Layout header={'header'} footer={'footer'}>
						main
					</Layout>
				</section>
				<section>
					<h2>Loading</h2>
					<Loading />
				</section>
				<section>
					<h2>Menu</h2>
					<Menu>
						<Menu.Item iconBefore="talend-stop" href="#" active>
							Item A
						</Menu.Item>
						<Menu.Item iconBefore="talend-stop" href="#">
							Item B
						</Menu.Item>
						<Menu.Item iconBefore="talend-stop" href="#">
							Item C
						</Menu.Item>
					</Menu>
				</section>
				<section>
					<h2>Modal</h2>
					<Modal
						disclosure={<Button.Primary>Send invitation email</Button.Primary>}
						title="Send invitation email"
					>
						Invitation email will be send to this address: <strong>test@email.com</strong>
						<br />
						Do you want to send this email now?
					</Modal>
				</section>
				<section>
					<h2>Popover</h2>
					<Popover
						aria-label="Custom popover"
						disclosure={<Button.Primary>Open popover</Button.Primary>}
					>
						Custom popover
					</Popover>
				</section>
				<section>
					<h2>Skeleton</h2>
					<Skeleton />
				</section>
				<section>
					<h2>Switch</h2>
					<Switch value="a" values={['a', 'b', 'c']} />
				</section>
				<section>
					<h2>Tabs</h2>
					<Tabs.TabList>
						<Tabs.Tab>Tab 1</Tabs.Tab>
						<Tabs.Tab>Tab 2</Tabs.Tab>
						<Tabs.Tab>Tab 3</Tabs.Tab>
					</Tabs.TabList>
				</section>
				<section>
					<h2>Tags</h2>
					<Tag.Success>Tag</Tag.Success>
					<Tag.Destructive>Tag</Tag.Destructive>
					<Tag.Information>Tag</Tag.Information>
					<Tag.Warning>Tag</Tag.Warning>
				</section>
				<section>
					<h2>Toggles</h2>
					<Toggle icon="talend-datagrid">Toggle</Toggle>
				</section>
				<section>
					<h2>Tooltips</h2>
					<Tooltip title="tooltip title">
						<Button>Button</Button>
					</Tooltip>
				</section>
				<section>
					<h2>Visually Hidden</h2>
					This content is visible<VisuallyHidden> and, this, is visually hidden</VisuallyHidden>!
				</section>
			</main>
		</ThemeProvider>
	);
}
