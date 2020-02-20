import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Inject from '../../Inject';
import theme from './RichLayout.scss';

const TooltipPropTypes = {
	id: PropTypes.string.isRequired,
	children: PropTypes.oneOfType([PropTypes.node, PropTypes.arrayOf(PropTypes.node)]),
	className: PropTypes.string,
};

const Header = ({ id, children, className }) => (
	<header id={id} className={classNames(theme.header, 'tc-tooltip-header', className)}>
		{children}
	</header>
);
Header.propTypes = TooltipPropTypes;

const Body = ({ id, children, className }) => (
	<div id={id} className={classNames(theme.body, 'tc-tooltip-body', className)}>
		<div id={`${id}-content`} className={classNames(theme.content, 'tc-tooltip-content')}>
			{children}
		</div>
	</div>
);
Body.propTypes = TooltipPropTypes;

const Footer = ({ id, children, className }) => (
	<footer id={id} className={classNames(theme.footer, 'tc-tooltip-footer', className)}>
		{children}
	</footer>
);
Footer.propTypes = TooltipPropTypes;

const RichLayout = React.forwardRef((props, ref) => (
	<div id={props.id} className={theme['rich-layout']} ref={ref} tabIndex="-1">
		<Header id={`${props.id}-header`}>
			{Inject.getReactElement(props.getComponent, props.Header)}
		</Header>
		<Body id={`${props.id}-body`} className={props.className}>
			{props.text && <p>{props.text}</p>}
			{!props.text && Inject.getReactElement(props.getComponent, props.Content)}
		</Body>
		<Footer id={`${props.id}-footer`}>
			{Inject.getReactElement(props.getComponent, props.Footer)}
		</Footer>
	</div>
));

RichLayout.Header = Header;
RichLayout.Body = Body;
RichLayout.Footer = Footer;

RichLayout.propTypes = {
	className: PropTypes.string,
	Content: Inject.getReactElement.propTypes,
	getComponent: PropTypes.func,
	Header: Inject.getReactElement.propTypes,
	Footer: Inject.getReactElement.propTypes,
	text: PropTypes.string,
	id: PropTypes.string.isRequired,
};

export default RichLayout;
