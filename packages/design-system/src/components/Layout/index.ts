import Layout from './Layout';
import Footer from './Footer';

const LayoutComponent = Layout as typeof Layout & {
	Footer: typeof Footer;
};

LayoutComponent.Footer = Footer;

export default LayoutComponent;
