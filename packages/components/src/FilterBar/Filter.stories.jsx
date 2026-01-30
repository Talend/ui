import ActionBar from '../ActionBar';
import FilterBar from './FilterBar.component';

const propsDockToggle = {
	id: 'FILTER-dockAndDockable',
	dockable: true,
	docked: false,
	navbar: true,
	onFilter: () => console.log('onFilter'),
	onBlur: () => console.log('onBlur'),
	onFocus: () => console.log('onFocus'),
	onToggle: () => console.log('onToggle'),
	placeholder: 'My placeholder',
	highlight: false,
	tooltipPlacement: 'bottom',
};

const propsIconAlwaysVisble = { ...propsDockToggle, iconAlwaysVisible: true, dockable: false };

const propsNoDockToggle = {
	id: 'FILTER-noDockAndNoDockable',
	dockable: false,
	docked: false,
	navbar: false,
	onFilter: () => console.log('onFilter'),
	onBlur: () => console.log('onBlur'),
	onFocus: () => console.log('onFocus'),
	onToggle: () => console.log('onToggle'),
	placeholder: 'Type your filter term',
	tooltipPlacement: 'bottom',
	highlight: false,
};

const propsDisabled = { ...propsDockToggle, disabled: true };

const divStyle = {
	width: '18.75rem',
};

const meta = {
	title: 'Components/Form - Inline form/FilterBar',
	component: FilterBar,
	tags: ['autodocs'],
};

export default meta;

export const DefaultDockAndDockable = {
	render: () => (
		<div style={divStyle}>
			<p>When not docked but dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsDockToggle} />
			</ActionBar>
		</div>
	),
};

export const NoDockedNoDockableAndIconVisible = {
	render: () => (
		<div style={divStyle}>
			<p>When icon always visible and not docked, no dockable in an ActionBar</p>
			<ActionBar>
				<FilterBar {...propsIconAlwaysVisble} />
			</ActionBar>
		</div>
	),
};

export const CustomUndockNoDockable = {
	render: () => (
		<div>
			<p>When not docked and no dockable take full width</p>
			<FilterBar {...propsNoDockToggle} />
		</div>
	),
};

export const DisabledInput = {
	render: () => (
		<div style={divStyle}>
			<p>With the input filter disable</p>
			<ActionBar>
				<FilterBar {...propsDisabled} />
			</ActionBar>
		</div>
	),
};
