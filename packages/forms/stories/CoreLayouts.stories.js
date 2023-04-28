import PropTypes from 'prop-types';
import { HeaderBar, Layout, Dialog, Drawer as DrawerComponent } from '@talend/react-components';
import Form from '../src';

const simple = require('./json/concepts/simple.json');

function LayoutDrawer({ title, stacked, ...props }) {
	const drawers = [
		<DrawerComponent.Container stacked={stacked}>
			<Form {...props} />
		</DrawerComponent.Container>,
	];
	return (
		<Layout drawers={drawers} mode="TwoColumns" header={<HeaderBar />}>
			<div style={{ margin: 10 }}>
				<h1>{title}</h1>
				<p>To use a UIForm in a drawer you just have to create your component this way:</p>
				<code>{'<Drawer.Container><UIForm {...props} /></Drawer.Container>'}</code>
			</div>
		</Layout>
	);
}
LayoutDrawer.propTypes = {
	title: PropTypes.string,
	stacked: PropTypes.bool,
};

export default {
	title: 'Core concepts/Layouts',
};

export const Default = () => (
	<div>
		<h1>Form by default take 100% width of the container</h1>
		<Form data={simple} />
	</div>
);
export const Drawer = () => <LayoutDrawer title="UIForm in a drawer" data={simple} />;

export const DrawerStacked = () => (
	<LayoutDrawer title="UIForm in a drawer" data={simple} stacked />
);

export const Modal = () => (
	<Dialog header="UIForm in a Modal" flex show>
		<Form data={simple} />
	</Dialog>
);

export const Skeleton = () => <Form loading />;

export const NoButton = () => <Form loading actions={[]} />;

export const SkeletonDrawer = () => <LayoutDrawer loading title="Form in loading in drawer" />;

export const SkeletonDrawerStacked = () => (
	<LayoutDrawer loading title="Form in loading in drawer" stacked />
);
