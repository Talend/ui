import React, { Component } from 'react';
import classNames from 'classnames';
import { translate } from 'react-i18next';
import theme from './Item.scss';
import ItemPropTypes from './Item.propTypes';
import Action from '../../../Actions/Action';
import I18N_DOMAIN_COMPONENTS from '../../../constants';

function itemLabelClasses() {
	return classNames(theme['tc-listview-item-label'], 'tc-listview-item-label');
}

class Item extends Component {
	componentDidUpdate(prevProps) {
		const { children, measure, item } = this.props;
		const { children: prevChildren, item: prevItem } = prevProps;
		if (
			children &&
			(children.length !== prevChildren.length || item.expanded !== prevItem.expanded)
		) {
			measure();
		}
	}

	render() {
		const { id, item, parentItem, isSwitchBox, searchCriteria, children, t } = this.props;

		/**
		 * This function allow to get component rendering based on searchCriteria
		 * @param label the current label to parse & to render
		 */
		function getSearchedLabel(label) {
			const splitRegex = new RegExp(`(${searchCriteria})`, 'gi');
			return label.split(splitRegex).map((part, index) => {
				const higlighted =
					part.toLowerCase() === searchCriteria.toLowerCase() ? <b>{part}</b> : part;
				return <span key={index}>{higlighted}</span>;
			});
		}

		const itemId = id && `checkbox-${id}`;
		const itemClassName = classNames(
			'checkbox',
			{ 'switch-nested': children },
			{ switch: isSwitchBox },
		);
		const ariaLabel = item.checked
			? t('TC_LISTVIEW_DESELECT', { defaultValue: 'Deselect {{ value }}', value: item.label })
			: t('TC_LISTVIEW_SELECT', { defaultValue: 'Select {{ value }}', value: item.label });

		let expandLabel;
		if (children) {
			expandLabel = item.expanded
				? t('TC_LISTVIEW_COLLAPSE', { defaultValue: 'Collapse {{ value }}', value: item.label })
				: t('TC_LISTVIEW_EXPAND', { defaultValue: 'Expand {{ value }}', value: item.label });
		}

		return (
			<div
				id={id}
				className={itemClassName}
				key={item.index}
				role="option"
				aria-selected={item.checked}
			>
				<label htmlFor={itemId}>
					<input
						id={itemId}
						type="checkbox"
						checked={item.checked}
						onChange={event => item.onChange(event, item, parentItem)}
						aria-label={ariaLabel}
					/>
					<span className={itemLabelClasses()}>
						{searchCriteria ? getSearchedLabel(item.label) : item.label}
					</span>
				</label>
				{children && (
					<div className={classNames('checkbox-nested-expand', { expanded: item.expanded })}>
						<Action
							bsStyle="link"
							icon="talend-caret-down"
							onClick={event => item.onExpandToggle(event, item)}
							label={expandLabel}
							hideLabel
						/>
					</div>
				)}
				{children && item.expanded && <div className="checkbox-nested">{children}</div>}
			</div>
		);
	}
}

Item.propTypes = ItemPropTypes;

export default translate(I18N_DOMAIN_COMPONENTS)(Item);
