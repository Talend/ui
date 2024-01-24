import { Component } from 'react';
import { withTranslation } from 'react-i18next';

import classNames from 'classnames';

import Action from '../../../Actions/Action';
import Checkbox from '../../../Checkbox';
import I18N_DOMAIN_COMPONENTS from '../../../constants';
import Icon from '../../../Icon';
import TooltipTrigger from '../../../TooltipTrigger';
import ItemPropTypes from './Item.propTypes';

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
		const { id, item, parentItem, isSwitchBox, searchCriteria, children, dataTest, t } = this.props;

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
			{ 'switch-nested': children },
			{ switch: isSwitchBox },
			{ 'with-icon': item.icon },
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
				data-test={dataTest}
				data-testid={dataTest}
			>
				<Checkbox
					id={itemId}
					onChange={event => item.onChange(event, item, parentItem)}
					checked={item.checked}
					label={
						<>
							{searchCriteria ? getSearchedLabel(item.label) : item.label}
							{item.icon && (
								<TooltipTrigger label={item.icon.title} tooltipPlacement="bottom">
									<span>
										<Icon {...item.icon} />
									</span>
								</TooltipTrigger>
							)}
						</>
					}
					aria-label={ariaLabel}
					data-test={dataTest && `${dataTest}.checkbox`}
					data-testid={dataTest && `${dataTest}.checkbox`}
				/>
				{children && (
					<div
						className={classNames('checkbox-nested-expand', { expanded: item.expanded })}
						data-test={dataTest && `${dataTest}.checkbox-nested-expand`}
						data-testid={dataTest && `${dataTest}.checkbox-nested-expand`}
					>
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

export default withTranslation(I18N_DOMAIN_COMPONENTS)(Item);
