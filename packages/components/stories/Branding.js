import React from 'react';
import PropTypes from 'prop-types';
import { storiesOf, action } from '@storybook/react';
import talendIcons from '@talend/icons/dist/react';
import { branding, profiles } from './config/branding';
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

function ProfileForm({ key, name, profile, onChange }) {
	function onValueChange(event, property) {
		return onChange(name, property, event.target.value);
	}

	return (
		<form>
			<div className="form-group">
				<input id={`name-${key}`} className="form-control" value={name} onChange={event => onValueChange(event, 'name')} />
				<label htmlFor={`name-${key}`} className="control-label">Name</label>
			</div>

			<legend style={{ margin: 0 }}>Simple</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={profile.color} onChange={event => onValueChange(event, 'color')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={profile.reverseColor} onChange={event => onValueChange(event, 'reverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Hover</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={profile.hoverColor} onChange={event => onValueChange(event, 'hoverColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={profile.hoverReverseColor} onChange={event => onValueChange(event, 'hoverReverseColor')} />
				</div>
			</div>

			<legend style={{ margin: 0 }}>Selected</legend>
			<div className="form-group inline-group">
				<div>
					<label htmlFor={`color-${key}`} className="control-label">Color</label>
					<input id={`color-${key}`} className="form-control" type="color" value={profile.selectedColor} onChange={event => onValueChange(event, 'selectedColor')} />
				</div>
				<div>
					<label htmlFor={`reverseColor-${key}`} className="control-label">Reverse Color</label>
					<input id={`reverseColor-${key}`} className="form-control" type="color" value={profile.selectedReverseColor} onChange={event => onValueChange(event, 'selectedReverseColor')} />
				</div>
			</div>
		</form>
	);
}

function ComponentForm({ key, name, component, onChange }) {
	function onProfileChange(event) {
		return onChange(name, 'profile', event.target.value);
	}
	function onReverseChange() {
		return onChange(name, 'reverse', !component.reverse);
	}

	return (
		<form>
			<legend>{name}</legend>
			<div className="form-group">
				<div>
					<input id={`comp-profile-${key}`} className="form-control" value={component.profile} onChange={onProfileChange} />
					<label htmlFor={`comp-profile-${key}`} className="control-label">Profile</label>
				</div>
				<div className="checkbox">
					<label>
						<input id={`reverseColor-${key}`} type="checkbox" value={component.reverse} onChange={onReverseChange} />
						<span>Reverse Color</span>
					</label>
				</div>
			</div>
		</form>
	);
}

class BrandingConfigurer extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			profiles,
			branding,
		};
		this.onComponentChange = this.onComponentChange.bind(this);
		this.onProfileChange = this.onProfileChange.bind(this);
	}

	onProfileChange(name, property, value) {
		if (property === 'name') {
			this.setState((oldState) => {
				const newProfiles = {
					...oldState.profiles,
					[value]: oldState.profiles[name],
				};
				delete newProfiles[name];
				return { profiles: newProfiles };
			});
		} else {
			this.setState((oldState) => {
				const newProfiles = {
					...oldState.profiles,
					[name]: {
						...oldState.profiles[name],
						[property]: value,
					},
				};
				return { profiles: newProfiles };
			});
		}
	}

	onComponentChange(name, property, value) {
		this.setState((oldState) => {
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

	render() {
		return (
			<section className="branding-configurer">
				<Branding
					profiles={this.state.profiles}
					{...this.state.branding}
				/>
				<section>
					<h1>Profiles</h1>
					<div className="branding-profiles">
						{
							Object.keys(this.state.profiles)
								.map((name, index) => <ProfileForm
									key={index}
									name={name}
									profile={this.state.profiles[name]}
									onChange={this.onProfileChange}
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
			</section>
		);
	}
}
BrandingConfigurer.propTypes = {
	children: PropTypes.arrayOf(PropTypes.node),
};

storiesOf('Branding')
	.addDecorator(story => (
		<div className="branding">
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
