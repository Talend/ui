import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Actions, CircularProgress, Icon, Inject } from '@talend/react-components';
import theme from './RichTooltip.scss';

export function RichTooltipContent(props) {
	let content;

	if (props.loading) {
		content = (
			<div className={theme['tc-center-content']}>
				<CircularProgress />
			</div>
		);
	}

	if (props.error) {
		content = (
			<div className={classNames(theme['tc-center-content'], theme['tc-error-wrapper'])}>
				<Icon name="talend-warning" className={theme['tc-center-icon']} />
				<div className={theme['tc-error-body']}>
					<h1>Whoops !</h1>
					<div>{props.error}</div>
				</div>
			</div>
		);
	}

	if (typeof props.Content === 'string' && !(props.error || props.loading)) {
		content = props.Content;
	}

	if (content) {
		return <RichTooltip.Body className={props.className} Content={content} />;
	}

	return Inject.getReactElement(props.getComponent, props.Content);
}

RichTooltipContent.propTypes = {
	className: PropTypes.string,
	getComponent: PropTypes.func,
	loading: PropTypes.bool,
	Content: Inject.getReactElement.propTypes,
	error: PropTypes.string,
};

export function RichTooltipBody(props) {
	// https://stackoverflow.com/questions/47179795/ie-flexbox-vertical-align-center-and-min-height
	return (
		<div className={theme['tc-tooltip-fix-ie']}>
			<div
				className={classNames(props.className, {
					[theme['tc-tooltip-body']]: true,
					'tc-tooltip-body': true,
				})}
			>
				{props.Content}
			</div>
		</div>
	);
}

RichTooltipBody.propTypes = {
	className: PropTypes.string,
	Content: RichTooltipContent.propTypes.Content,
};

export function RichTooltipHeader(props) {
	return (
		<header className={classNames(theme['tc-tooltip-header'], 'tc-tooltip-header')}>
			<h1 title={props.title}>{props.title}</h1>
			<Actions actions={props.right} />
		</header>
	);
}

RichTooltipHeader.propTypes = {
	title: PropTypes.string.isRequired,
	right: PropTypes.array,
};

export function RichTooltipFooter(props) {
	return (
		<footer className={classNames(theme['tc-tooltip-footer'], 'tc-tooltip-footer')}>
			<Actions actions={props.left} />
			<Actions
				className={classNames(theme['tc-tooltip-right-actions'], 'tc-tooltip-right-actions')}
				actions={props.right}
			/>
		</footer>
	);
}

RichTooltipFooter.propTypes = {
	left: PropTypes.array,
	right: PropTypes.array,
};

export default function RichTooltip(props) {
	return (
		<span>
			{Inject.getReactElement(props.getComponent, props.Header)}
			<RichTooltipContent {...props} />
			{Inject.getReactElement(props.getComponent, props.Footer)}
		</span>
	);
}

RichTooltip.propTypes = {
	Header: Inject.getReactElement.propTypes,
	Content: Inject.getReactElement.propTypes,
	Footer: Inject.getReactElement.propTypes,
	...RichTooltipContent.propTypes,
};

RichTooltip.Header = RichTooltipHeader;
RichTooltip.Body = RichTooltipBody;
RichTooltip.Footer = RichTooltipFooter;
