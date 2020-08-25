import React from 'react';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Layout/Header';
import settings from '../../../../ui/packages/cmf/src/mock/settings';

export default function HeaderBar() {
	return (
		<Header>
			<Dropdown
				items={[
					<Button>Open</Button>,
					<></>,
					<Button>New API</Button>,
					<Button>Make a copy</Button>,
					<></>,
					<Button>Import</Button>,
					<Button>Settings</Button>,
					<Button>Erase all API content</Button>,
				]}
			>
				API
			</Dropdown>
			<Button>Export</Button>
			<Button>Documentation (preview)</Button>
			<span className="text">API Saved</span>
		</Header>
	);
}
