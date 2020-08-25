import React from 'react';
import styled from 'styled-components';
import Button from '../../components/Button';
import Dropdown from '../../components/Dropdown';
import Header from '../../components/Layout/Header';

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
					<Dropdown
						items={[
							<strong>OpenAPI Specification / Swagger</strong>,
							<Button>OAS 3.0</Button>,
							<Button>OAS / Swagger 2.0</Button>,
							<Button>Swagger 1.2</Button>,
							<></>,
							<strong>RAML</strong>,
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
			<Button>Export</Button>
			<Button>Documentation (preview)</Button>
			<span className="text">API Saved</span>
		</Header>
	);
}
