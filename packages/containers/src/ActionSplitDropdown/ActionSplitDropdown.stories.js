import ActionSplitDropdown from '.';

export default {
	title: 'ActionSplitDropdown',
};

export function Default() {
	return (
		<div>
			<p>ActionSplitDropdown with items in the settings</p>
			<ActionSplitDropdown actionId="menu:items-id" />
			<p>ActionSplitDropdown with items from an expression</p>
			<ActionSplitDropdown actionId="menu:items" />
			<p>ActionSplitDropdown from setting and items from props</p>
			<ActionSplitDropdown actionId="menu:first" actionIds={['menu:first', 'menu:second']} />
			<p>ActionDropdown from setting and a link into the items</p>
			<ActionSplitDropdown actionId="action-dropdown:href" />
		</div>
	);
}
