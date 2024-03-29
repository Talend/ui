import { useTranslation } from 'react-i18next';

import classNames from 'classnames';
import PropTypes from 'prop-types';

import { TagBeta } from '@talend/design-system';

import { Action } from '../Actions';
import I18N_DOMAIN_COMPONENTS from '../constants';
import Inject from '../Inject';

import theme from './ActionList.module.scss';

/**
 * return the formatted action id
 * if there is no action id, it is generated from the action label
 * @param  {string} id        sidepanel id
 * @param  {string} action    current action
 * @return {string}            formatted id
 */
function getActionId(id, action) {
	if (action.id || action.label) {
		const actionId = action.id || action.label.toLowerCase().split(' ').join('-');
		return id && `${id}-nav-${actionId}`;
	}
	return undefined;
}

function ActionListItem({ getComponent, id, onSelect, action, isSelected, isNav, itemClassName }) {
	const { t } = useTranslation(I18N_DOMAIN_COMPONENTS);
	const a11y = {
		role: 'presentation',
	};
	const extra = {};
	const Renderers = Inject.getAll(getComponent, { Action });
	if (isSelected && isNav) {
		// @see https://tink.uk/using-the-aria-current-attribute/
		a11y['aria-current'] = true;
	}
	if (onSelect) {
		extra.onClick = event => {
			onSelect(event, action);
			if (action.onClick) {
				action.onClick(event);
			}
		};
	}

	const actionProps = {
		...action,
		active: undefined, // active scope is only the list item
		id: getActionId(id, action),
		bsStyle: 'link',
		role: 'link',
		...extra,
	};

	return (
		<li
			key={action.key || action.label}
			className={classNames(theme['tc-action-list-item'], 'tc-action-list-item', itemClassName, {
				active: isSelected,
				[theme.active]: isSelected,
			})}
			{...a11y}
		>
			<Renderers.Action {...actionProps}>
				{action.beta && <TagBeta>{t('BETA', 'Beta')}</TagBeta>}
			</Renderers.Action>
		</li>
	);
}

function ActionList(props) {
	const { className, actions, selected, ...rest } = props;

	const isActionSelected = action => {
		if (selected) {
			return action === selected;
		}
		return action.active;
	};

	return (
		<ul
			className={classNames(
				'nav',
				'nav-pills',
				'nav-stacked',
				theme['tc-action-list'],
				'tc-action-list',
				className,
				{
					'nav-inverse': !props.reverse,
				},
			)}
		>
			{actions.map((action, index) => (
				<ActionListItem
					key={action.id || index}
					action={action}
					isSelected={isActionSelected(action)}
					{...rest}
				/>
			))}
		</ul>
	);
}

ActionList.displayName = 'ActionList';

ActionList.defaultProps = {
	actions: [],
};

if (process.env.NODE_ENV !== 'production') {
	const actionPropType = PropTypes.shape({
		id: PropTypes.string,
		active: PropTypes.bool,
		icon: PropTypes.string,
		key: PropTypes.string,
		label: PropTypes.string,
		beta: PropTypes.bool,
		onClick: PropTypes.func,
	});

	ActionListItem.propTypes = {
		id: PropTypes.string,
		itemClassName: PropTypes.string,
		onSelect: PropTypes.func,
		action: actionPropType,
		isSelected: PropTypes.bool,
		isNav: PropTypes.bool,
		getComponent: PropTypes.func,
	};

	ActionList.propTypes = {
		id: PropTypes.string,
		actions: PropTypes.arrayOf(actionPropType),
		onSelect: PropTypes.func,
		selected: actionPropType,
		className: PropTypes.string,
		reverse: PropTypes.bool,
	};
}

export default ActionList;
