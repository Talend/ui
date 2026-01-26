import { useState } from 'react';
import Layout from '../Layout';
import TabBar from '../TabBar';
import HeaderBar from '../HeaderBar';
import Drawer from './Drawer.component';
import SidePanel from '../SidePanel';

const Content = () => (
	<div style={{ padding: '20px' }}>
		<h2>Main Content Area</h2>
		<p>This is the main content area of the application.</p>
	</div>
);

const DrawerContent = () => (
	<div style={{ padding: '15px' }}>
		<h3>Drawer Content</h3>
		<p>Drawer content goes here</p>
	</div>
);

const meta = {
	title: 'Components/Layout/Drawer',
	component: Drawer,
	tags: ['autodocs'],
};

export default meta;

export const Default = {
	render: () => {
		const [show, setShow] = useState(false);
		return (
			<Layout>
				<HeaderBar
					brand="Talend"
					onToggle={() => setShow(!show)}
					logo={<span>Logo</span>}
					title="Drawer Example"
				/>
				<Drawer show={show} onClose={() => setShow(false)}>
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const WithEditableHeader = {
	render: () => {
		const [show, setShow] = useState(true);
		const [title, setTitle] = useState('Edit me');
		return (
			<Layout>
				<HeaderBar brand="Talend" title="With Editable Header" />
				<Drawer
					show={show}
					onClose={() => setShow(false)}
					title={title}
					onEdit={() => console.log('editing')}
				>
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const StackedDrawers = {
	render: () => {
		const [show1, setShow1] = useState(false);
		const [show2, setShow2] = useState(false);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Stacked Drawers" />
				<Drawer show={show1} onClose={() => setShow1(false)} title="First Drawer">
					<button onClick={() => setShow2(true)}>Open Second Drawer</button>
					<DrawerContent />
				</Drawer>
				<Drawer show={show2} onClose={() => setShow2(false)} title="Second Drawer">
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const WithTabs = {
	render: () => {
		const [show, setShow] = useState(true);
		const [activeTab, setActiveTab] = useState('tab1');
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Drawer With Tabs" />
				<Drawer show={show} onClose={() => setShow(false)}>
					<TabBar
						items={[
							{ key: 'tab1', label: 'Tab 1' },
							{ key: 'tab2', label: 'Tab 2' },
						]}
						selectedKey={activeTab}
						onSelect={key => setActiveTab(key)}
					/>
					<div style={{ padding: '15px' }}>
						{activeTab === 'tab1' && <p>Content of Tab 1</p>}
						{activeTab === 'tab2' && <p>Content of Tab 2</p>}
					</div>
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const WithSidePanel = {
	render: () => {
		const [showDrawer, setShowDrawer] = useState(true);
		const [showSidePanel, setShowSidePanel] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Drawer with SidePanel" />
				<SidePanel title="Side Panel" show={showSidePanel} onClose={() => setShowSidePanel(false)}>
					<p>Side panel content</p>
				</SidePanel>
				<Drawer show={showDrawer} onClose={() => setShowDrawer(false)}>
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const WithCustomActions = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Drawer with Custom Actions" />
				<Drawer
					show={show}
					onClose={() => setShow(false)}
					title="Custom Actions"
					actions={[
						{ label: 'Save', onClick: () => console.log('save') },
						{ label: 'Cancel', onClick: () => setShow(false) },
					]}
				>
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const LargeContent = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Drawer with Large Content" />
				<Drawer show={show} onClose={() => setShow(false)} title="Large Content">
					<div style={{ padding: '15px' }}>
						{Array.from({ length: 20 }, (_, i) => (
							<p key={i}>Item {i + 1} - This is some content</p>
						))}
					</div>
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const ScrollableContent = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Scrollable Drawer" />
				<Drawer show={show} onClose={() => setShow(false)} title="Scrollable" maxHeight={300}>
					<div style={{ padding: '15px', overflowY: 'auto', maxHeight: '250px' }}>
						{Array.from({ length: 50 }, (_, i) => (
							<p key={i}>Line {i + 1}</p>
						))}
					</div>
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const CustomPosition = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Custom Position Drawer" />
				<Drawer show={show} onClose={() => setShow(false)} title="Right Position" position="right">
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const FullHeight = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout style={{ height: '100vh' }}>
				<HeaderBar brand="Talend" title="Full Height Drawer" />
				<Drawer show={show} onClose={() => setShow(false)} title="Full Height">
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};

export const WithLoading = {
	render: () => {
		const [show, setShow] = useState(true);
		return (
			<Layout>
				<HeaderBar brand="Talend" title="Loading Drawer" />
				<Drawer show={show} onClose={() => setShow(false)} isLoading>
					<DrawerContent />
				</Drawer>
				<Content />
			</Layout>
		);
	},
};
