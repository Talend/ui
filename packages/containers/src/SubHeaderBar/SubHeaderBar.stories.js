import SubHeaderBar from '.';

const viewSubHeader = {
	title: 'MyTitle',
	actionCreatorCancel: 'subheaderbar:cancel',
	actionCreatorSubmit: 'subheaderbar:submit',
	actionCreatorChange: 'subheaderbar:change',
	actionCreatorGoBack: 'subheaderbar:goback',
};

const injectedComponentsCenter = {
	center: [
		{
			component: 'FilterBar',
			center: true,
			navbar: true,
			docked: false,
			dockable: false,
		},
	],
};
const injectedComponentsRight = {
	right: [
		{
			actionId: 'subheaderbar:sharing',
			component: 'Action',
			right: true,
		},
		{
			actionId: 'subheaderbar:bubbles',
			component: 'Action',
			right: true,
		},
	],
};

const props = {
	...viewSubHeader,
};

export default {
	title: 'SubHeaderBar',
};

export const Default = () => <SubHeaderBar {...props} />;
export const Subtitle = () => <SubHeaderBar subTitle="mySubTitle" {...props} />;
export const Icon = () => <SubHeaderBar iconId="talend-file-csv-o" {...props} />;
export const Editable = () => <SubHeaderBar {...props} editable />;
export const InProgress = () => <SubHeaderBar {...props} editable inProgress />;
export const Loading = () => <SubHeaderBar {...props} loading />;
export const RightActions = () => <SubHeaderBar {...props} components={injectedComponentsRight} />;
export const CenterActions = () => (
	<SubHeaderBar {...props} components={injectedComponentsCenter} />
);
export const all = () => (
	<SubHeaderBar
		{...props}
		components={{ ...injectedComponentsCenter, ...injectedComponentsRight }}
		iconId="talend-file-csv-o"
		subTitle="mySubTitle"
		editable
	/>
);
