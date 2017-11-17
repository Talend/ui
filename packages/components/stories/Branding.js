import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import { branding, logo as logoBranding, themes } from './config/branding';
import { Branding, HeaderBar, SidePanel, IconsProvider, Layout } from '../src/index';

const icons = {
	// side panel
	'talend-dataprep': talendIcons['talend-dataprep'],
	'talend-download': talendIcons['talend-download'],
	'talend-star': talendIcons['talend-star'],
	'talend-opener': talendIcons['talend-opener'],
	// header bar
	'talend-launcher': talendIcons['talend-launcher'],
	'talend-logo': talendIcons['talend-logo'],
	'talend-logo-dp': talendIcons['talend-logo-dp'],
	'talend-logo-ic': talendIcons['talend-logo-ic'],
	'talend-logo-mc': talendIcons['talend-logo-mc'],
	'talend-logo-square': talendIcons['talend-logo-square'],
	'talend-question-circle': talendIcons['talend-question-circle'],
	'talend-search': talendIcons['talend-search'],
	'talend-user-circle': talendIcons['talend-user-circle'],
};

const headerProps = {
	brand: {
		id: 'header-brand',
		label: 'Example App Name',
		onClick: action('onApplicationNameClick'),
	},
	logo: {
		id: 'header-logo',
		onClick: action('onLogoClick'),
	},
	search: {
		icon: {
			name: 'talend-search',
			title: 'Search',
			bsStyle: 'link',
			tooltipPlacement: 'bottom',
		},
		id: 'header-search',
		onToggle: action('onSearchClick'),
	},
	help: {
		id: 'header-help',
		onClick: action('onHelpClick'),
	},
	user: {
		id: 'header-user',
		items: [
			{
				icon: 'talend-cog',
				label: 'Settings',
				onClick: action('onSettingsClick'),
			},
		],
		name: 'John Doe',
		firstName: 'John',
		lastName: 'Doe',
	},
	products: {
		id: 'header-products',
		items: [
			{
				icon: 'talend-logo-dp',
				key: 'tdp',
				label: 'Data Preparation',
			},
			{
				icon: 'talend-logo-ic',
				key: 'tic',
				label: 'Integration Cloud',
			},
			{
				icon: 'talend-logo-mc',
				key: 'tmc',
				label: 'Management Console',
			},
		],
		onSelect: action('onProductClick'),
	},
};

const sidePanelProps = {
	id: 'context',
	actions: [
		{
			label: 'Preparations',
			icon: 'talend-dataprep',
			onClick: action('Preparations clicked'),
			active: true,
		},
		{
			label: 'Datasets',
			icon: 'talend-download',
			onClick: action('Datasets clicked'),
		},
		{
			label: 'Favorites',
			icon: 'talend-star',
			onClick: action('Favorites clicked'),
		},
	],
	onToggleDock: action('Toggle dock clicked'),
	tooltipPlacement: 'top',
};

function ThemeForm({ key, name, theme, onChange }) {
	function onValueChange(event, property) {
		return onChange(name, property, event.target.value);
	}
	function onDefaultChange() {
		return onChange(name, 'isDefault', !theme.isDefault);
	}

	return (
		<form>
			<div className="form-group">
				<div>
					<input id={`name-${key}`} className="form-control" value={name} onChange={event => onValueChange(event, 'name')} />
					<label htmlFor={`name-${key}`} className="control-label">Name</label>
				</div>
				<div className="checkbox">
					<label>
						<input id={`is-default-${key}`} type="checkbox" checked={theme.isDefault} onChange={onDefaultChange} />
						<span>Default theme</span>
					</label>
				</div>
			</div>

			<legend style={{ margin: 0 }}>Simple</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.color} onChange={event => onValueChange(event, 'color')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.reverseColor} onChange={event => onValueChange(event, 'reverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Hover</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.hoverColor} onChange={event => onValueChange(event, 'hoverColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.hoverReverseColor} onChange={event => onValueChange(event, 'hoverReverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Selected</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={theme.selectedColor} onChange={event => onValueChange(event, 'selectedColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={theme.selectedReverseColor} onChange={event => onValueChange(event, 'selectedReverseColor')} />
				</div>
			</div>
		</form>
	);
}
ThemeForm.propTypes = {
	key: PropTypes.any,
	name: PropTypes.string.isRequired,
	theme: PropTypes.shape({
		color: PropTypes.string,
		reverseColor: PropTypes.string,
		hoverColor: PropTypes.string,
		hoverReverseColor: PropTypes.string,
		selectedColor: PropTypes.string,
		selectedReverseColor: PropTypes.string,
		isDefault: PropTypes.bool,
	}),
	onChange: PropTypes.func.isRequired,
};

function ComponentForm({ key, name, component, onChange }) {
	function onThemeChange(event) {
		return onChange(name, 'theme', event.target.value);
	}
	function onReverseChange() {
		return onChange(name, 'reverse', !component.reverse);
	}

	return (
		<form>
			<legend>{name}</legend>
			<div className="form-group">
				<div>
					<input id={`comp-theme-${key}`} className="form-control" value={component.theme} onChange={onThemeChange} />
					<label htmlFor={`comp-theme-${key}`} className="control-label">Theme</label>
				</div>
				<div className="checkbox">
					<label>
						<input id={`reverseColor-${key}`} type="checkbox" checked={component.reverse} onChange={onReverseChange} />
						<span>Reverse Color</span>
					</label>
				</div>
			</div>
		</form>
	);
}
ComponentForm.propTypes = {
	key: PropTypes.any,
	name: PropTypes.string.isRequired,
	component: PropTypes.shape({
		theme: PropTypes.string,
		reverse: PropTypes.bool,
	}),
	onChange: PropTypes.func.isRequired,
};

function LogoForm({ logo, onChange }) {
	return (
		<form>
			<div className="form-group">
				<div className="form-group">
					<textarea id={'logo-src'} className="form-control" onChange={event => onChange('source', event.target.value)}>
						{logo.source}
					</textarea>
					<label htmlFor={'logo-src'} className="control-label">Source</label>
				</div>
				<div className="form-group">
					<label htmlFor={'logo-width'} className="control-label">Width: {logo.width}px</label>
					<input id={'logo-width'} type="range" min="10" max="300" value={logo.width} onChange={event => onChange('width', event.target.value)} />
				</div>
			</div>
		</form>
	);
}
LogoForm.propTypes = {
	logo: PropTypes.shape({
		source: PropTypes.string,
		width: PropTypes.number,
	}),
	onChange: PropTypes.func.isRequired,
};

class BrandingConfigurer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			themes,
			branding,
			logo: logoBranding,
		};
		this.onComponentChange = this.onComponentChange.bind(this);
		this.onThemeChange = this.onThemeChange.bind(this);
		this.onLogoChange = this.onLogoChange.bind(this);
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
					Object.keys(oldState.themes).forEach((themeName) => {
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

	onLogoChange(name, value) {
		this.setState(oldState => ({
			logo: {
				...oldState.logo,
				[name]: value,
			},
		}));
	}

	render() {
		return (
			<section className="branding-configurer">
				<Branding
					themes={this.state.themes}
					logo={this.state.logo}
					{...this.state.branding}
				/>
				<section>
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
				<section>
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
				<section>
					<h1>Logo</h1>
					<LogoForm logo={this.state.logo} onChange={this.onLogoChange} />
				</section>
				<section>
					<h1>Configuration payload</h1>
					<pre>
						{JSON.stringify(this.state, null, 2)}
					</pre>
				</section>
			</section>
		);
	}
}
BrandingConfigurer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
};

storiesOf('Branding')
	.addDecorator(story => (
		<div>
			<IconsProvider defaultIcons={icons} />
			{story()}
		</div>
	))
	.addWithInfo('default', () => {
		const header = (<HeaderBar {...headerProps} />);
		const sidePanel = (<SidePanel {...sidePanelProps} />);
		return (
			<Layout
				header={header}
				mode="TwoColumns"
				one={sidePanel}
			>
				<BrandingConfigurer />
			</Layout>
		);
	});
