import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import { Actions } from '../Actions';
import CircularProgress from '../CircularProgress';
import Icon from '../Icon';
import Inject from '../Inject';
import theme from './RichTooltip.scss';

export function getContent(props) {
	const { error, loading, Content } = props;

	if (error) {
		return (
			<div className={classNames(theme['tc-center-content'], theme['tc-error-wrapper'])}>
				<Icon name="talend-warning" className={theme['tc-center-icon']} />
				<div className={theme['tc-error-body']}>
					<h4>{error.title}</h4>
					<div>{error.message}</div>
				</div>
			</div>
		);
	} else if (loading) {
		return (
			<div className={theme['tc-center-content']}>
				<CircularProgress />
			</div>
		);
	} else if (typeof Content === 'string') {
		return Content;
	}

	return false;
}

getContent.propTypes = {
	Content: Inject.getReactElement.propTypes,
	error: PropTypes.shape({
		title: PropTypes.string,
		message: PropTypes.string,
	}),
	loading: PropTypes.bool,
};

export function RichTooltipContent(props) {
	const content = getContent(props);

	if (content) {
		return <RichTooltip.Body className={props.className} Content={content} />;
	}

	return Inject.getReactElement(props.getComponent, props.Content);
}

RichTooltipContent.propTypes = {
	className: PropTypes.string,
	getComponent: PropTypes.func,
	...getContent.propTypes,
};

export function RichTooltipBody(props) {
	return (
		<div className={classNames(props.className, theme['tc-tooltip-body'], 'tc-tooltip-body')}>
			<div className={classNames(theme['tc-tooltip-content'], 'tc-tooltip-content')}>
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
			<h4 title={props.title}>{props.title}</h4>
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
