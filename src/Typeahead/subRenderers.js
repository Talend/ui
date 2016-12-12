import React from 'react';
import { FormControl } from 'react-bootstrap';
import Icon from '../Icon';
import theme from './Typeahead.scss';

export const renderInputComponent = icon => (
	(props) => {
		const renderedIcon = icon && (
			<div className={theme['icon-cls']}>
				<Icon name={icon.name} title={icon.title} />
			</div>
		);
		return (
			<div className={theme['typeahead-input-icon']}>
				<FormControl {...props} />
				{renderedIcon}
			</div>
		);
	}
);

export const renderSectionTitle = (section) => {
	if (section) {
		return (
			<div className={theme['section-header']}>
				{section.icon && <Icon name={section.icon.name} title={section.icon.title} />}
				<span className={theme['section-header-title']}>{section.title}</span>
			</div>
		);
	}
	return null;
};

export const renderItem = (item, { value }) => {
	const splittedTitle = !value ? [item.title] : item.title.split(value);
	const emphasisedTitle = splittedTitle.map((title, index) => (
		<span key={index}>
			{title}
			{index !== splittedTitle.length - 1 &&
			<em className={theme['highlight-match']}>{value}</em>}
		</span>
	));
	return (
		<div className={theme.item}>
			<span className={theme['item-title']}>{emphasisedTitle}</span>
			<p className={theme['item-description']}>{item.description}</p>
		</div>
	);
};
