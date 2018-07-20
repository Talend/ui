import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Inject from '../Inject';
import theme from './RichTooltip.scss';

export function RichTooltipContent(props) {
	if (props.text) {
		return <p>{props.text}</p>;
	}

	return Inject.getReactElement(props.getComponent, props.Content);
}

RichTooltipContent.propTypes = {
	Content: Inject.getReactElement.propTypes,
	getComponent: PropTypes.func,
	text: PropTypes.string,
};

export default function RichTooltip(props) {
	return (
		<span>
			<header className={classNames(theme.header, 'tc-tooltip-header')}>
				{Inject.getReactElement(props.getComponent, props.Header)}
			</header>
			<div className={classNames(props.className, theme.body, 'tc-tooltip-body')}>
				<div className={classNames(theme.content, 'tc-tooltip-content')}>
					{props.text && <p>{props.text}</p>}
					{!props.text && Inject.getReactElement(props.getComponent, props.Content)}
				</div>
			</div>
			<footer className={classNames(theme.footer, 'tc-tooltip-footer')}>
				{Inject.getReactElement(props.getComponent, props.Footer)}
			</footer>
		</span>
	);
}

RichTooltip.propTypes = {
	...RichTooltipContent.propTypes,
	Header: Inject.getReactElement.propTypes,
	Footer: Inject.getReactElement.propTypes,
};
