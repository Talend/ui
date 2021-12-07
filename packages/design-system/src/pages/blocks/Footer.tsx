import React from 'react';
import Layout from '../../components/Layout';
import Link from '../../components/Link';

export default function Footer() {
	return (
		<Layout.Footer className="footer">
			<Link href="#cookie-policy">Cookie policy</Link>
			<Link href="#terms-use">Terms of use</Link>
			<Link href="#us-eula">Talend EULA</Link>
		</Layout.Footer>
	);
}
