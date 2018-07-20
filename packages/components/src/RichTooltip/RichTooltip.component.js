import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import Inject from '../Inject';
import theme from './RichTooltip.scss';

export function RichTooltipContent(props) {
	if (typeof props.Content === 'string') {
		return <p>{props.Content}</p>;
	}

	return Inject.getReactElement(props.getComponent, props.Content);
}

RichTooltipContent.propTypes = {
	className: PropTypes.string,
	getComponent: PropTypes.func,
	Content: Inject.getReactElement.propTypes,
};

export default function RichTooltip(props) {
	return (
		<span>
			<header className={classNames(theme.header, 'tc-tooltip-header')}>
				{Inject.getReactElement(props.getComponent, props.Header)}
			</header>
			<div className={classNames(props.className, theme.body, 'tc-tooltip-body')}>
				<div className={classNames(theme.content, 'tc-tooltip-content')}>
					<RichTooltipContent {...props} />
				</div>
			</div>
			<footer className={classNames(theme.footer, 'tc-tooltip-footer')}>
				{Inject.getReactElement(props.getComponent, props.Footer)}
			</footer>
		</span>
	);
}

RichTooltip.propTypes = {
	Header: Inject.getReactElement.propTypes,
	Content: Inject.getReactElement.propTypes,
	Footer: Inject.getReactElement.propTypes,
	...RichTooltipContent.propTypes,
};
