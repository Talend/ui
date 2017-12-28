import React from 'react';
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import { Nav, NavItem } from 'react-bootstrap';
import { defaultLogo, LogoForm } from './LogoForm';
import { defaultThemes, ThemeForm } from './ThemeForm';
import { defaultComponentsBranding, ComponentForm } from './ComponentForm';
import { defaultLoading, LoadingForm } from './LoadingForm';
import { Branding, CircularProgress } from '../../src/index';

export default class BrandingConfigurer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			activeTab: 'themes',
			branding: defaultComponentsBranding,
			loading: defaultLoading,
			logo: defaultLogo,
			themes: defaultThemes,
		};
		this.onComponentChange = this.onComponentChange.bind(this);
		this.onThemeChange = this.onThemeChange.bind(this);
		this.onLoadingChange = this.onLoadingChange.bind(this);
		this.onLogoChange = this.onLogoChange.bind(this);
		this.onTabChange = this.onTabChange.bind(this);
	}

	onThemeChange(name, property, value) {
		switch (property) {
			case 'name':
				this.setState(oldState => {
					const newThemes = {
						...oldState.themes,
						[value]: oldState.themes[name],
					};
					delete newThemes[name];
					return { themes: newThemes };
				});
				break;
			case 'isDefault':
				this.setState(oldState => {
					const newThemes = {};
					Object.keys(oldState.themes).forEach(themeName => {
						const nextTheme = oldState.themes[themeName];
						if (themeName === name) {
							newThemes[themeName] = {
								...nextTheme,
								isDefault: value,
							};
						} else if (value && nextTheme.isDefault) {
							newThemes[themeName] = {
								...nextTheme,
								isDefault: false,
							};
						} else {
							newThemes[themeName] = nextTheme;
						}
					});
					return { themes: newThemes };
				});
				break;
			default:
				this.setState(oldState => {
					const newThemes = {
						...oldState.themes,
						[name]: {
							...oldState.themes[name],
							[property]: value,
						},
					};
					return { themes: newThemes };
				});
				break;
		}
	}

	onComponentChange(name, property, value) {
		this.setState(oldState => {
			const newBranding = {
				...oldState.branding,
				[name]: {
					...oldState.branding[name],
					[property]: value,
				},
			};
			return { branding: newBranding };
		});
	}

	onLoadingChange(name, value) {
		this.setState(oldState => ({
			loading: {
				...oldState.loading,
				[name]: value,
			},
		}));
	}

	onLogoChange(name, value) {
		this.setState(oldState => ({
			logo: {
				...oldState.logo,
				[name]: value,
			},
		}));
	}

	onTabChange(eventKey) {
		this.setState({ activeTab: eventKey });
	}

	render() {
		return (
			<section className="branding-configurer">
				<Branding
					themes={this.state.themes}
					loading={this.state.loading}
					logo={this.state.logo}
					{...this.state.branding}
				/>

				<Nav bsStyle="tabs" activeKey="1" onSelect={this.onTabChange}>
					<NavItem eventKey="themes">Themes</NavItem>
					<NavItem eventKey="components">Components</NavItem>
					<NavItem eventKey="logo">Logo</NavItem>
					<NavItem eventKey="payload">Payload</NavItem>
					<NavItem eventKey="loading">Loading</NavItem>
				</Nav>

				{this.state.activeTab === 'themes' &&
					<section className="content">
						<h1>Themes</h1>
						<div className="branding-themes">
							{
								Object.keys(this.state.themes)
									.map((name, index) => <ThemeForm
										key={index}
										name={name}
										theme={this.state.themes[name]}
										onChange={this.onThemeChange}
									/>)
							}
						</div>
					</section>
				}
				{this.state.activeTab === 'components' &&
					<section className="content">
						<h1>Components</h1>
						<div className="branding-components">
							{
								Object.keys(this.state.branding)
									.map((name, index) => <ComponentForm
										key={index}
										name={name}
										component={this.state.branding[name]}
										onChange={this.onComponentChange}
									/>)
							}
						</div>
					</section>
				}
				{this.state.activeTab === 'logo' &&
					<section className="content">
						<h1>Logo</h1>
						<LogoForm logo={this.state.logo} onChange={this.onLogoChange} />
					</section>
				}
				{this.state.activeTab === 'payload' &&
					<section className="content">
						<h1>Configuration payload</h1>
						<pre>
							{JSON.stringify(omit(this.state, 'activeTab'), null, 2)}
						</pre>
					</section>
				}
				{this.state.activeTab === 'loading' &&
					<section className="content">
						<h1>Loading</h1>
						<CircularProgress />
						<LoadingForm loading={this.state.loading} onChange={this.onLoadingChange} />
					</section>
				}
			</section>
		);
	}
}

BrandingConfigurer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
};
