import PropTypes from 'prop-types';
import classnames from 'classnames';

import theme from './TileFooter.module.scss';

function Footer(props) {
	return (
		<div className={classnames(theme['tc-tile-footer'], 'tc-tile-footer')}>{props.children}</div>
	);
}

Footer.propTypes = {
	children: PropTypes.node,
};

export default Footer;
