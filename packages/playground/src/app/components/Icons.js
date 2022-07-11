import React from 'react';
import Layout from '@talend/react-components/lib/Layout';
import SidePanel from '@talend/react-containers/lib/SidePanel';
import HeaderBar from '@talend/react-containers/lib/HeaderBar';
// eslint-disable-next-line @talend/import-depth
import logo from '@talend/icons/src/svg/products/logo.svg';

export function Icons() {
	return (
		<Layout mode="TwoColumns" one={<SidePanel />} header={<HeaderBar />}>
			<article>
				<h1>Use SVG Icons in our apps</h1>
				<p>
					I can import svg in my app code using the following snippet. You will have the url as
					string
				</p>
				<pre>import logo from '@talend/icons/src/svg/products/logo.svg';</pre>
				<p>Current url generated is {logo}</p>
				Let's use an image to display it:
				<img src={logo} alt="logo" style={{ width: 400 }} />
			</article>
		</Layout>
	);
}
