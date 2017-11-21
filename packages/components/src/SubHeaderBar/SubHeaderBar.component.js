import React from 'react';
import classNames from 'classnames';
import Icon from '../Icon';
import { Action } from '../Actions';
import ActionBar from '../ActionBar';
import theme from './SubHeaderBar.scss';

function fileIcon(icon) {
	return <Icon name={icon} />;
}

function title(label) {
	return <div>{label}</div>;
}

function subTitle(label) {
	return <div>{label}</div>;
}

function SubHeaderBar(props) {
	return (
		<div className={classNames(theme['tc-subheader-bar'])}>
			<div className={classNames(theme['tc-subheader-bar-back-button'])}>
				<ActionBar.Content tag="button" left>
					<Action {...props.returnAction} className={'tc-subheader-bar-back-icon'} hideLabel />
				</ActionBar.Content>
			</div>
			{props.iconFile && fileIcon(props.iconFile)}
			{props.title && title(props.title)}
			{props.subTitle && subTitle(props.subTitle)}
			<ActionBar.Content tag="button" right>
				<Action icon="talend-bubbles" onClick={() => console.log('return bubbles')} />
				<Action icon="talend-activity" onClick={() => console.log('return activity')} />
				<Action icon="talend-bell" onClick={() => console.log('return bell')} />
				<Action icon="talend-check" onClick={() => console.log('return check')} />
			</ActionBar.Content>
		</div>
	);
}

export default SubHeaderBar;
