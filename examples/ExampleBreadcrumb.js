import React from 'react';
import { Breadcrumb } from '../src';

export default function BreadcrumbExample() {
	return (
		<div>
			<h1>Breadcrumb</h1>
			<h2>Definition</h2>
			<p>The breadcrumb let the end user see where he is and let him go upper</p>
			<h2>Example</h2>
			<Breadcrumb>
				<Breadcrumb.Item href="#">
					Home
				</Breadcrumb.Item>
				<Breadcrumb.Item href="#">
					Library
				</Breadcrumb.Item>
				<Breadcrumb.Item active>
					Data
				</Breadcrumb.Item>
			</Breadcrumb>
		</div>
	);
}
