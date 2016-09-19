import React from 'react';
import { Breadcrumb } from 'react-cmf-bootstrap';

function ExampleBreadcrumb(props) {
	return (
		<div>
			<h1>Examples of Breadcrumb</h1>
			<Breadcrumb>
				<Breadcrumb.Item href="#">
					Home
				</Breadcrumb.Item>
				<Breadcrumb.Item href="http://getbootstrap.com/components/#breadcrumbs">
					Library
				</Breadcrumb.Item>
				<Breadcrumb.Item active>
					Data
				</Breadcrumb.Item>
			</Breadcrumb>
		</div>
	);
}

export default ExampleBreadcrumb;
